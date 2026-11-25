import assert from 'node:assert/strict';import {randomUUID} from 'node:crypto';import pg from 'pg';
process.loadEnvFile(process.env.ACCOUNT_TEST_ENV_FILE);
const admin=new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true}}),schema='delete_test_'+randomUUID().replaceAll('-','');const url=new URL(process.env.DATABASE_URL);url.searchParams.set('options','-c search_path='+schema);const pool=new pg.Pool({connectionString:url.toString(),ssl:{rejectUnauthorized:true}});const {deleteAccount,activeAccount}=await import('../lib/account-deletion.js');
const id=randomUUID(),other=randomUUID(),email='delete-fixture@example.test';
try{
 await admin.query('CREATE SCHEMA '+schema);
 const tables=(await admin.query("SELECT tablename FROM pg_tables WHERE schemaname='public'")).rows;
 for(const {tablename}of tables){assert.match(tablename,/^[a-z_]+$/);await admin.query(`CREATE TABLE ${schema}.${tablename} (LIKE public.${tablename} INCLUDING ALL)`)}
 await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS deletion_started_at timestamptz');
 await pool.query('ALTER TABLE smartclass_visit_receipts ADD FOREIGN KEY(visit_id) REFERENCES smartclass_visits(id) ON DELETE CASCADE');
 await pool.query('INSERT INTO users(id,email) VALUES($1,$2),($3,$4)',[id,email,other,'other-fixture@example.test']);
 await pool.query("INSERT INTO sc_stitch_orders(id,user_id,mode,plan,amount,status,provider_id,next_renewal,billing_day) VALUES('fixture-order',$1,'live','explorer',5900,'active','fixture-sub',NOW()+INTERVAL '1 month',25)",[id]);
 await pool.query("INSERT INTO sc_stitch_payments(mode,payment_id,order_id,amount,paid_at,period_end) VALUES('live','fixture-payment','fixture-order',5900,NOW(),NOW()+INTERVAL '1 month')");
 await pool.query('INSERT INTO notes(id,user_id,text) VALUES($1,$2,$3),($4,$5,$6)',[randomUUID(),id,'Delete this',randomUUID(),other,'Keep this']);
 await pool.query('INSERT INTO sc_push_preferences(user_id) VALUES($1)',[id]);
 await pool.query("INSERT INTO support_tickets(id,user_email,message) VALUES(980001,$1,'Delete message')",[email]);
 await pool.query("INSERT INTO smartclass_feedback(id,submission_id,usage_reason,payment_reason,email,comments) VALUES(980001,$1,'other','other',$2,'Delete feedback')",[randomUUID(),email]);
 await pool.query("INSERT INTO sc_mail_jobs(id,kind,recipient,payload) VALUES('fixture-mail','contact','support@smartclassedu.com',$1)",[JSON.stringify({email,message:'Delete queued data'})]);
 const user={customerId:id,email};const getConfig=async()=>({mode:'live'});
 await assert.rejects(()=>deleteAccount(user,{pool,getConfig,cancel:async()=>{throw Error('Provider unavailable')}}),/Provider/);
 assert.equal((await pool.query('SELECT 1 FROM users WHERE id=$1',[id])).rowCount,1);
 assert.equal(await activeAccount(id,email,false,pool),false);assert.equal(await activeAccount(id,email,true,pool),true);
 let cancellations=0;assert.deepEqual(await deleteAccount(user,{pool,getConfig,cancel:async order=>{cancellations++;await pool.query("UPDATE sc_stitch_orders SET status='cancelled' WHERE id=$1",[order.id])}}),{deleted:true});assert.equal(cancellations,1);
 assert.equal((await pool.query('SELECT 1 FROM users WHERE id=$1',[id])).rowCount,0);assert.equal(await activeAccount(id,email,true,pool),false);
 assert.equal((await pool.query('SELECT 1 FROM users WHERE id=$1',[other])).rowCount,1);
 assert.equal((await pool.query('SELECT * FROM notes')).rows[0].text,'Keep this');
 for(const table of ['support_tickets','smartclass_feedback','sc_mail_jobs','sc_push_preferences'])assert.equal((await pool.query('SELECT COUNT(*)::int AS n FROM '+table)).rows[0].n,0);
 const order=(await pool.query('SELECT * FROM sc_stitch_orders')).rows[0];assert.match(order.user_id,/^deleted:/);assert.equal(order.status,'cancelled');assert.equal((await pool.query('SELECT COUNT(*)::int AS n FROM sc_stitch_payments')).rows[0].n,1);
 console.log('PASS: real row removal, cancellation failure/retry, session rejection, private-data cleanup, anonymous ledger and unrelated-account preservation. Isolated fixtures only; no live accounts deleted.');
}finally{await pool.end();await admin.query('DROP SCHEMA '+schema+' CASCADE');await admin.end()}
