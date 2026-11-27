import assert from 'node:assert/strict';
import pg from 'pg';
import {randomUUID} from 'node:crypto';
import {newOrder,PLANS,verifiedPayment} from '../lib/stitch-core.js';
import {blackFridayOffer} from '../lib/black-friday.js';
if(process.env.BILLING_TEST_ENV_FILE)process.loadEnvFile(process.env.BILLING_TEST_ENV_FILE);
const schema='bf_test_'+randomUUID().replaceAll('-','');
const admin=new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true},max:1});
let db;
try{
 await admin.query(`CREATE SCHEMA ${schema}`);
 const url=new URL(process.env.DATABASE_URL);url.searchParams.set('options','-c search_path='+schema);process.env.DATABASE_URL=url.href;
 const mod=await import('../lib/stitch-db.js');db=mod.database();await mod.ready();
 await db.query('CREATE TABLE users(id text PRIMARY KEY,deletion_started_at timestamptz)');
 await db.query("INSERT INTO users(id) SELECT 'parent-'||n FROM generate_series(1,252) n");
 // Seed 249 reservations in this isolated test schema only.
 await db.query("INSERT INTO sc_stitch_orders(id,user_id,mode,plan,amount,initial_amount,promotion,next_renewal,billing_day) SELECT 'seed-'||n,'parent-'||n,'test','academy',12900,7900,'black-friday-2026',NOW()+interval '1 month',27 FROM generate_series(1,249) n");
 const quote={initialAmount:7900,recurringAmount:12900};
 const results=await Promise.allSettled([250,251,252].map(n=>mod.registerOrder(newOrder({customerId:'parent-'+n},'academy','test'),quote)));
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(results.filter(r=>r.status==='rejected'&&r.reason.status===409).length,2);
 assert.equal((await blackFridayOffer(db,'test')).available,false);
 const order=results.find(r=>r.status==='fulfilled').value.order;
 const sub={id:'test-provider',amount:12900,merchantReference:order.id,payerId:order.user_id};await mod.storeSubscription(order,sub,'https://express.stitch.money/subscribe/test');
 const event={id:'first',type:'SUBSCRIPTION',subscriptionId:sub.id,status:'PAID',amount:7900},payment={...event,merchantReference:order.id,paidAt:new Date().toISOString()};
 await mod.settle(event,'event-1',payment,'test',verifiedPayment,PLANS);
 assert.equal((await db.query('SELECT amount FROM sc_stitch_payments WHERE payment_id=$1',['first'])).rows[0].amount,7900);
 assert.equal((await mod.settle(event,'event-duplicate',payment,'test',verifiedPayment,PLANS)).duplicate,true);
 await assert.rejects(()=>mod.settle({...event,id:'extra'},'event-extra',{...payment,id:'extra'},'test',verifiedPayment,PLANS));
 await mod.cancelOrder({...order,provider_id:sub.id},{cancel:async()=>({id:sub.id,status:'CANCELLED'})});
 assert.equal((await blackFridayOffer(db,'test')).available,false,'Paid cancellation keeps its claimed place');
 await db.query("UPDATE sc_stitch_orders SET status='cancelled' WHERE id='seed-1'");
 assert.equal((await blackFridayOffer(db,'test')).available,true,'Unpaid cancelled reservation releases its place');
 const loser=results.findIndex(r=>r.status==='rejected')+250;
 const regular=await mod.registerOrder(newOrder({customerId:'parent-'+loser},'smart','test'),{initialAmount:7900,recurringAmount:7900});assert.equal(regular.order.promotion,undefined);
 console.log('PASS: isolated PostgreSQL race for final place, actual R79 ledger, replay protection, paid/unpaid cancellation and unchanged Smart Start');
}finally{await db?.end();if(!/^bf_test_[a-f0-9]{32}$/.test(schema))throw Error('Unsafe test schema');await admin.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);await admin.end();}
