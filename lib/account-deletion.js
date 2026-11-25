import {randomUUID} from 'node:crypto';
import {database,cancelOrder} from './stitch-db.js';
import {configured} from './stitch-setup.js';
import {createClient,problem} from './stitch-core.js';
export async function activeAccount(id,email,allowDeleting=false,pool=database()){
 const r=await pool.query('SELECT deletion_started_at FROM users WHERE id::text=$1 AND lower(email)=lower($2)',[String(id),email]);
 return !!r.rows[0]&&(allowDeleting||!r.rows[0].deletion_started_at);
}
export async function purgeAccount(c,user){
 const id=String(user.customerId),email=user.email,anonymous='deleted:'+randomUUID();
 await c.query("SELECT pg_advisory_xact_lock(hashtext('account-data-mail'))");
 // Keep shared learning spaces, but remove this parent's identity and own contributions.
 await c.query('DELETE FROM messages WHERE sender_id::text=$1',[id]);
 await c.query('DELETE FROM task_submissions WHERE user_id::text=$1',[id]);
 await c.query("UPDATE tasks SET created_by=NULL,created_by_name='Deleted account' WHERE created_by::text=$1",[id]);
 await c.query("UPDATE rooms SET created_by=NULL,created_by_name='Deleted account' WHERE created_by::text=$1",[id]);
 await c.query(`UPDATE rooms SET participants=ARRAY(SELECT x FROM unnest(participants) WITH ORDINALITY p(x,n) WHERE x::text<>$1),participant_names=ARRAY(SELECT participant_names[n::int] FROM unnest(participants) WITH ORDINALITY p(x,n) WHERE x::text<>$1) WHERE $1=ANY(participants::text[])`,[id]);
 for(const table of ['notes','assessments','neo_conversations','neo_memory','task_submissions','user_notifications','smartclass_visits'])await c.query(`DELETE FROM ${table} WHERE user_id::text=$1`,[id]);
 await c.query('DELETE FROM sc_push_devices WHERE user_id=$1',[id]);
 await c.query('DELETE FROM sc_push_preferences WHERE user_id=$1',[id]);
 await c.query('DELETE FROM support_tickets WHERE user_id=$1 OR lower(user_email)=lower($2)',[id,email]);
 await c.query('DELETE FROM smartclass_feedback WHERE lower(email)=lower($1)',[email]);
 await c.query('DELETE FROM smartclass_feedback_email_recipients WHERE lower(email)=lower($1)',[email]);
 await c.query('DELETE FROM smartclass_feedback_email_optouts WHERE lower(email)=lower($1)',[email]);
 await c.query("DELETE FROM sc_mail_jobs WHERE lower(recipient)=lower($1) OR lower(payload->>'email')=lower($1)",[email]);
 await c.query('DELETE FROM smartclass_payment_emails WHERE lower(recipient)=lower($1)',[email]);
 await c.query('DELETE FROM smartclass_payfast_orders WHERE user_id=$1 OR lower(email)=lower($2)',[id,email]);
 await c.query('DELETE FROM smartclass_subscriptions WHERE user_id=$1',[id]);
 // Minimal anonymous financial ledger lets delayed provider events reconcile safely.
 await c.query('UPDATE smartclass_subscription_payments SET user_id=$2 WHERE user_id=$1',[id,anonymous]);
 await c.query("UPDATE sc_stitch_orders SET user_id=$2,checkout_url=NULL,access_until=NULL WHERE user_id=$1",[id,anonymous]);
 await c.query('DELETE FROM users WHERE id::text=$1',[id]);
}
export async function deleteAccount(user,{pool=database(),getConfig=configured,cancel=cancelOrder}={}){
 const c=await pool.connect(),id=String(user.customerId);let locked=false;
 try{
  locked=(await c.query('SELECT pg_try_advisory_lock(hashtext($1)) AS locked',['delete-account:'+id])).rows[0].locked;
  if(!locked)throw problem('Account deletion is already in progress. Please wait.',409);
  await c.query('BEGIN');
  const account=(await c.query('SELECT id,email FROM users WHERE id::text=$1 FOR UPDATE',[id])).rows[0];
  if(!account||account.email.toLowerCase()!==user.email.toLowerCase())throw problem('Please sign in again.',401);
  if((await c.query('SELECT 1 FROM admins WHERE lower(email)=lower($1)',[user.email])).rowCount)throw problem('Staff accounts must be managed in the admin dashboard.',403);
  const orders=(await c.query("SELECT * FROM sc_stitch_orders WHERE user_id=$1 AND status NOT IN ('cancelled','closed','abandoned')",[id])).rows;
  if(orders.some(o=>!o.provider_id))throw problem('A checkout is still being confirmed. Please try deletion again once it finishes, or contact support.',409);
  await c.query('UPDATE users SET deletion_started_at=NOW() WHERE id::text=$1',[id]);
  await c.query('COMMIT');
  // Persist each confirmed cancellation. A provider failure keeps the account for a safe retry.
  if(orders.length){const cfg=await getConfig();for(const order of orders){if(order.mode!==cfg.mode)throw problem('An older subscription needs support to confirm cancellation before deletion.',409);await cancel(order,createClient(cfg))}}
  await c.query('BEGIN');await c.query('SELECT id FROM users WHERE id::text=$1 FOR UPDATE',[id]);
  await purgeAccount(c,user);await c.query('COMMIT');return {deleted:true};
 }catch(e){await c.query('ROLLBACK');throw e}finally{if(locked)await c.query('SELECT pg_advisory_unlock(hashtext($1))',['delete-account:'+id]);c.release()}
}
