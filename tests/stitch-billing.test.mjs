import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {Webhook} from 'svix';
import {SignJWT} from 'jose';
import {PLANS,newOrder,nextRenewal,subscriptionRequest,verifiedPayment,checkoutUrl,config,createClient} from '../lib/stitch-core.js';
import {billingUser,checkPost} from '../lib/billing-auth.js';
import {createWebhookHandler} from '../api/stitch-webhook.js';
const user={customerId:'42',name:'Parent Example',email:'parent@example.test'};
const order={...newOrder(user,'smart','test',new Date('2026-01-31T12:00:00Z')),provider_id:'sub-1'};
assert.match(order.id,/^[A-Za-z0-9]+$/);assert.equal(subscriptionRequest(order,user).merchantReference,order.id);assert.equal(order.amount,7900);assert.equal(order.next_renewal.toISOString(),'2026-02-27T22:00:00.000Z');
assert.equal(nextRenewal(new Date('2026-12-25T12:00:00Z')).toISOString(),'2027-01-24T22:00:00.000Z');
assert.equal(subscriptionRequest(order,user).recurrence.byMonthDay,28);assert.equal(subscriptionRequest(order,user).initialAmount,7900);
assert.throws(()=>newOrder(user,'__proto__','test'));assert.equal(PLANS.academy.cents,12900);
const event={id:'payment-1',status:'PAID',amount:7900,type:'SUBSCRIPTION',subscriptionId:'sub-1'};
const payment={...event,merchantReference:order.id,paidAt:'2026-01-31T12:00:00Z'};
assert.equal(+verifiedPayment(event,payment,order),+order.next_renewal);
for(const change of [{amount:1},{merchantReference:'other-order'},{status:'FAILED'},{id:'other-payment'},{paidAt:null}])assert.throws(()=>verifiedPayment(event,{...payment,...change},order));
assert.throws(()=>verifiedPayment({...event,subscriptionId:'wrong'},payment,order));
assert.throws(()=>checkoutUrl('https://evil.example/subscribe/123',{origin:'https://www.smartclasss.com'}));
assert.match(checkoutUrl('https://express.stitch.money/subscribe/123',{origin:'https://www.smartclasss.com'}),/redirect_url=/);
let calls=[];const cfg={id:'test-client',secret:'unused-test',mode:'test',fingerprint:'unit-'+randomBytes(8).toString('hex')};
const client=createClient(cfg,async(url,opts)=>{calls.push({url,body:opts.body&&JSON.parse(opts.body)});return {ok:true,json:async()=>url.endsWith('/token')?{success:true,data:{accessToken:'fake-token'}}:{success:true,data:{ok:true}}}});
await client.subscription({});await client.subscription({});assert.equal(calls.filter(c=>c.url.endsWith('/token')).length,1);assert.equal(calls[0].body.scope,'client_recurringpaymentconsentrequest');
process.env.AUTH_SESSION_SECRET='test-session-secret-with-more-than-32-characters';
const jwt=await new SignJWT({customerId:'42',email:user.email,name:user.name}).setProtectedHeader({alg:'HS256'}).setSubject('google-42').setIssuer('smartclass').setAudience('smartclass-parent').setExpirationTime('1h').sign(new TextEncoder().encode(process.env.AUTH_SESSION_SECRET));
const req={headers:{cookie:'__Host-sc-parent='+jwt,origin:'https://www.smartclasss.com','content-type':'application/json'}};
const authenticated=await billingUser(req,{lookup:async()=>true});assert.equal(authenticated.customerId,'42');req.headers['x-csrf-token']=authenticated.csrf;checkPost(req,authenticated);assert.throws(()=>checkPost({...req,headers:{...req.headers,origin:'https://evil.example'}},authenticated));await assert.rejects(()=>billingUser({headers:{}}));
const secret='whsec_'+randomBytes(32).toString('base64'),signer=new Webhook(secret),paid=new Set();let settled=0,lookups=0;
const handler=createWebhookHandler({getConfig:()=>({...cfg,webhookSecret:secret}),getClient:()=>({payment:async()=>{lookups++;return {payment}}}),settlePayment:async(ev,id,p,mode,validate)=>{assert.equal(mode,'test');validate(ev,p,order);if(paid.has(ev.id))return {duplicate:true};paid.add(ev.id);settled++;return {duplicate:false}}});
async function deliver({payload=event,id='msg-1',stamp=new Date(),tamper=false}={}){
 const body=JSON.stringify(payload),headers={'svix-id':id,'svix-timestamp':String(Math.floor(+stamp/1000)),'svix-signature':await signer.sign(id,stamp,body)};
 const req={method:'POST',headers,async *[Symbol.asyncIterator](){yield Buffer.from(tamper?body+' ':body)}};
 const res={setHeader(){},status(n){this.code=n;return this},json(d){this.data=d;return this},end(){return this}};await handler(req,res);return res;
}
const first=await deliver(),second=await deliver({id:'msg-2'});assert.equal(first.code,200);assert.equal(second.data.duplicate,true);assert.equal(settled,1);
assert.equal((await deliver({tamper:true})).code,400);assert.equal((await deliver({stamp:new Date(Date.now()-600000)})).code,400);assert.equal(lookups,2);
assert.equal((await deliver({payload:{...event,amount:1}})).code,400);
assert.equal((await deliver({payload:{type:'LINK'}})).data.ignored,true);
console.log('PASS: prices, month-end dates, scoped token reuse, parent authentication/CSRF, signature tampering/replay, subscription ownership, amount/reference checks and duplicate delivery handling.');



await assert.rejects(()=>billingUser(req,{lookup:async()=>false}));console.log('PASS: a previously valid session cannot access a deleted account');
