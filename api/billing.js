import {configured} from '../lib/stitch-setup.js';
import {billingUser,checkPost} from '../lib/billing-auth.js';
import {PLANS,config,problem,newOrder,subscriptionRequest,createClient,checkoutUrl,nextRenewal} from '../lib/stitch-core.js';
import {accountOrder,registerOrder,storeSubscription,markUnknown,cancelOrder} from '../lib/stitch-db.js';
export const maxDuration=60;
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('Vary','Cookie');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Method not allowed'});
 try{
  const user=await billingUser(req);let cfg;try{cfg=await configured()}catch(e){if(req.method==='GET')return res.status(200).json({configured:false,plan:'preview',csrf:user.csrf,packages:PLANS,error:e.message});throw e}
  const testAllowed=cfg.mode!=='test'||user.email.toLowerCase()===String(cfg.owner||'').toLowerCase();
  if(!testAllowed)return res.status(req.method==='GET'?200:403).json({configured:false,plan:'preview',csrf:user.csrf,error:'Checkout is being tested. Please check back soon.'});
  if(req.method==='GET'){
   const order=await accountOrder(user.customerId,cfg.mode);
   const access=order&&new Date(order.access_until)>new Date()&&PLANS[order.plan];
   return res.status(200).json({configured:true,mode:cfg.mode,csrf:user.csrf,plan:access?order.plan:'preview',packages:PLANS,quoteRenewal:nextRenewal().toISOString(),subscription:order?{plan:order.plan,status:order.status,accessUntil:order.access_until,nextRenewal:order.next_renewal,canCancel:!!order.provider_id&&order.status!=='cancelled',pending:!access&&['pending','creating','unknown'].includes(order.status)}:null});
  }
  checkPost(req,user);
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  if(!body||JSON.stringify(body).length>2000)throw problem('Invalid request');
  const client=createClient(cfg);
  if(body.action==='cancel'){
   const order=await accountOrder(user.customerId,cfg.mode);if(!order)throw problem('No subscription found',404);
   if(order.status!=='cancelled')await cancelOrder(order,client);
   return res.status(200).json({cancelled:true,accessUntil:order.access_until});
  }
  if(body.action!=='checkout'||body.recurringConsent!==true||!Object.hasOwn(PLANS,body.plan))throw problem('Please choose a package and confirm the monthly subscription.');
  if(cfg.mode==='live'&&process.env.STITCH_LIVE_ENABLED!=='true')throw problem('Live checkout has not been activated yet.',503);
  const result=await registerOrder(newOrder(user,body.plan,cfg.mode)),order=result.order;
  if(!result.created){
   if(order.plan!==body.plan)throw problem('You already have a package or unfinished checkout. Manage that subscription before choosing another.',409);
   if(new Date(order.access_until)>new Date())throw problem('This package is already available on your account.',409);
   if(order.status==='pending'&&order.checkout_url)return res.status(200).json({url:checkoutUrl(order.checkout_url,cfg)});
   if(['creating','unknown'].includes(order.status)){
    const data=await client.request('/subscriptions?limit=500&startTime='+encodeURIComponent(new Date(order.created_at).toISOString()),undefined,'client_recurringpaymentconsentrequest');
    const sub=data.subscriptions?.find(s=>s.merchantReference===order.id);
    if(sub){const url=checkoutUrl(sub.url,cfg);await storeSubscription(order,sub,url);return res.status(200).json({url})}
    throw problem('Your previous checkout is still being confirmed. Please contact support before trying again.',409);
   }
   throw problem('Please cancel the existing subscription before starting another.',409);
  }
  try{
   const sub=await client.subscription(subscriptionRequest(order,user)),url=checkoutUrl(sub.url,cfg);
   await storeSubscription(order,sub,url);
   return res.status(200).json({url});
  }catch(e){await markUnknown(order.id);throw e}
 }catch(e){const status=e.status||503;return res.status(status).json({error:status<500?e.message:'Checkout could not finish. No access has been unlocked. Please try again shortly or contact support.'})}
}

