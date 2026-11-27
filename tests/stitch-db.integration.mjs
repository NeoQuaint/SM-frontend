import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {database,ready,registerOrder,storeSubscription,settle,cancelOrder,accountOrder} from '../lib/stitch-db.js';
import {newOrder,verifiedPayment,PLANS} from '../lib/stitch-core.js';
if(process.env.BILLING_TEST_ENV_FILE)process.loadEnvFile(process.env.BILLING_TEST_ENV_FILE);
const suffix=randomUUID(),user={customerId:'billing-test-'+suffix},eventId='test-event-'+suffix;
let order;
try {
 await ready();
 const candidates=[newOrder(user,'smart','test'),newOrder(user,'smart','test')];
 const results=await Promise.all(candidates.map(order=>registerOrder(order,{initialAmount:order.amount,recurringAmount:order.amount})));
 assert.equal(results.filter(r=>r.created).length,1);order=results[0].order;
 const sub={id:'test-sub-'+suffix,merchantReference:order.id,amount:order.amount,payerId:user.customerId};
 await storeSubscription(order,sub,'https://express.stitch.money/subscribe/test');
 const event={id:'test-pay-'+suffix,type:'SUBSCRIPTION',status:'PAID',subscriptionId:sub.id,amount:order.amount};
 const payment={...event,merchantReference:order.id,paidAt:new Date().toISOString()};
 const outcomes=await Promise.all([settle(event,eventId,payment,'test',verifiedPayment,PLANS),settle(event,eventId,payment,'test',verifiedPayment,PLANS)]);
 assert.equal(outcomes.filter(r=>r.duplicate).length,1);
 const active=await accountOrder(user.customerId,'test');assert.equal(active.status,'active');assert.ok(new Date(active.access_until)>new Date());
 assert.equal((await database().query('SELECT count(*) FROM smartclass_subscription_payments WHERE checkout_id=$1',['stitch:'+event.id])).rows[0].count,'0');
 await cancelOrder(active,{cancel:async()=>({...sub,status:'CANCELLED'})});
 const cancelled=await accountOrder(user.customerId,'test');assert.equal(cancelled.status,'cancelled');assert.equal(+cancelled.access_until,+active.access_until);
 console.log('PASS: concurrent checkout creates one order; duplicate signed payment settlement grants once; test payments excluded from revenue; cancellation preserves paid access.');
} finally {
 if(order){await database().query('DELETE FROM sc_stitch_payments WHERE order_id=$1 AND mode=$2',[order.id,'test']);await database().query('DELETE FROM sc_stitch_orders WHERE user_id=$1 AND mode=$2',[user.customerId,'test']);await database().query('DELETE FROM sc_stitch_events WHERE event_id=$1 AND mode=$2',[eventId,'test']);}
 await database().end();
}

