import pg from 'pg';
let pool,initialized;
export function database(){if(!process.env.DATABASE_URL)throw Error('Billing database not configured');return pool ||= new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true},max:3,idleTimeoutMillis:10000,connectionTimeoutMillis:10000})}
export const SCHEMA=`
CREATE TABLE IF NOT EXISTS sc_stitch_orders(
 id text PRIMARY KEY,user_id text NOT NULL,mode text NOT NULL CHECK(mode IN ('test','live')),
 plan text NOT NULL,amount integer NOT NULL CHECK(amount>0),status text NOT NULL DEFAULT 'creating',
 provider_id text,checkout_url text,next_renewal timestamptz NOT NULL,billing_day integer NOT NULL,
 access_until timestamptz,created_at timestamptz NOT NULL DEFAULT NOW(),updated_at timestamptz NOT NULL DEFAULT NOW(),
 UNIQUE(mode,provider_id));
CREATE UNIQUE INDEX IF NOT EXISTS sc_stitch_one_open ON sc_stitch_orders(user_id,mode) WHERE status NOT IN ('cancelled','closed','abandoned');
CREATE TABLE IF NOT EXISTS sc_stitch_payments(
 mode text NOT NULL,payment_id text NOT NULL,order_id text NOT NULL REFERENCES sc_stitch_orders(id),
 amount integer NOT NULL,paid_at timestamptz NOT NULL,period_end timestamptz NOT NULL,PRIMARY KEY(mode,payment_id));
CREATE TABLE IF NOT EXISTS sc_stitch_events(
 mode text NOT NULL,event_id text NOT NULL,received_at timestamptz NOT NULL DEFAULT NOW(),PRIMARY KEY(mode,event_id));`;
export async function ready(){return initialized ||= database().query(SCHEMA).catch(e=>{initialized=null;throw e})}
export async function transaction(fn){await ready();const c=await database().connect();try{await c.query('BEGIN');const r=await fn(c);await c.query('COMMIT');return r}catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}}
export async function accountOrder(userId,mode){await ready();return (await database().query(`SELECT * FROM sc_stitch_orders WHERE user_id=$1 AND mode=$2 ORDER BY (access_until>NOW()) DESC NULLS LAST,created_at DESC LIMIT 1`,[String(userId),mode])).rows[0]}
export async function registerOrder(order){return transaction(async c=>{
 await c.query('SELECT pg_advisory_xact_lock(hashtext($1))',['stitch:'+order.mode+':'+order.user_id]);
 const existing=(await c.query(`SELECT * FROM sc_stitch_orders WHERE user_id=$1 AND mode=$2 AND (status NOT IN ('cancelled','closed','abandoned') OR access_until>NOW()) ORDER BY created_at DESC LIMIT 1`,[order.user_id,order.mode])).rows[0];
 if(existing)return {order:existing,created:false};
 await c.query(`INSERT INTO sc_stitch_orders(id,user_id,mode,plan,amount,next_renewal,billing_day) VALUES($1,$2,$3,$4,$5,$6,$7)`,[order.id,order.user_id,order.mode,order.plan,order.amount,order.next_renewal,order.billing_day]);
 return {order,created:true};
})}
export async function storeSubscription(order,sub,url){
 if(!sub?.id||sub.merchantReference!==order.id||sub.amount!==order.amount||String(sub.payerId)!==order.user_id)throw Error('Stitch returned mismatched subscription');
 await database().query(`UPDATE sc_stitch_orders SET provider_id=$2,checkout_url=$3,status='pending',updated_at=NOW() WHERE id=$1 AND status IN ('creating','unknown')`,[order.id,sub.id,url]);
}
export async function markUnknown(id){await database().query(`UPDATE sc_stitch_orders SET status='unknown',updated_at=NOW() WHERE id=$1 AND status='creating'`,[id])}
export async function settle(event,eventId,payment,mode,validate,plans){return transaction(async c=>{
 const o=(await c.query('SELECT * FROM sc_stitch_orders WHERE mode=$1 AND provider_id=$2 FOR UPDATE',[mode,event.subscriptionId])).rows[0];
 if(!o)throw Object.assign(Error('Subscription not registered yet'),{status:503});
 const until=validate(event,payment,o);
 const previous=(await c.query('SELECT 1 FROM sc_stitch_payments WHERE mode=$1 AND payment_id=$2',[mode,event.id])).rowCount;
 if(previous)return {duplicate:true};
 await c.query(`INSERT INTO sc_stitch_payments(mode,payment_id,order_id,amount,paid_at,period_end) VALUES($1,$2,$3,$4,$5,$6)`,[mode,event.id,o.id,o.amount,payment.paidAt,until]);
 await c.query(`INSERT INTO sc_stitch_events(mode,event_id) VALUES($1,$2) ON CONFLICT DO NOTHING`,[mode,eventId]);
 const updated=(await c.query(`UPDATE sc_stitch_orders SET status=CASE WHEN status IN ('cancelled','cancelling') THEN status ELSE 'active' END,access_until=GREATEST(COALESCE(access_until,$2),$2),updated_at=NOW() WHERE id=$1 RETURNING *`,[o.id,until])).rows[0];
 if(mode==='live'){
  await c.query(`INSERT INTO smartclass_subscription_payments(user_id,checkout_id,package,amount,status,completed_at) VALUES($1,$2,$3,$4,'completed',$5) ON CONFLICT(checkout_id) DO NOTHING`,[o.user_id,'stitch:'+event.id,plans[o.plan].name,o.amount/100,payment.paidAt]);
  await c.query(`INSERT INTO smartclass_subscriptions(user_id,package,amount,status,payment_reference,end_date) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(user_id) DO UPDATE SET package=EXCLUDED.package,amount=EXCLUDED.amount,status=EXCLUDED.status,payment_reference=EXCLUDED.payment_reference,end_date=EXCLUDED.end_date,updated_at=NOW()`,[o.user_id,plans[o.plan].name,o.amount/100,updated.status==='cancelled'?'cancelled':'active','stitch:'+o.provider_id,updated.access_until]);
 }
 return {duplicate:false};
})}
export async function cancelOrder(order,client){
 if(!order.provider_id)throw Object.assign(Error('Please allow us to reconcile this checkout before cancelling.'),{status:409});
 await database().query(`UPDATE sc_stitch_orders SET status='cancelling',updated_at=NOW() WHERE id=$1 AND status!='cancelled'`,[order.id]);
 const result=await client.cancel(order.provider_id);if(result?.id!==order.provider_id||result?.status!=='CANCELLED')throw Error('Cancellation not confirmed');
 await transaction(async c=>{await c.query(`UPDATE sc_stitch_orders SET status='cancelled',updated_at=NOW() WHERE id=$1`,[order.id]);if(order.mode==='live')await c.query(`UPDATE smartclass_subscriptions SET status='cancelled',updated_at=NOW() WHERE user_id=$1 AND payment_reference=$2`,[order.user_id,'stitch:'+order.provider_id])});
}

export async function rejectOrder(id){await database().query("UPDATE sc_stitch_orders SET status='abandoned',updated_at=NOW() WHERE id=$1 AND status='creating' AND provider_id IS NULL",[id])}
