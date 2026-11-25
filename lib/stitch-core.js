import {createHash,randomUUID} from 'node:crypto';
export const PLANS=Object.freeze({
 explorer:{name:'Little Explorer',cents:5900,categories:['numbers','colours','singalong']},
 smart:{name:'Smart Start',cents:7900,categories:['numbers','colours','singalong','find','objects','alphabet']},
 academy:{name:'Full Academy',cents:12900,categories:['numbers','colours','singalong','find','objects','alphabet','actions','spelling','stories','shapes']}
});
export function problem(message,status=400){return Object.assign(new Error(message),{status})}
export function config(env=process.env,{requireWebhook=true}={}){
 const id=env.STITCH_CLIENT_ID||env.Client_ID,secret=env.STITCH_CLIENT_SECRET||env.Client_secret,mode=id?.startsWith('test-')?'test':'live';
 if(!id||!secret||!env.DATABASE_URL||(requireWebhook&&!env.STITCH_WEBHOOK_SECRET))throw problem('Payments are being connected. Please try again later.',503);
 return {id,secret,mode,webhookSecret:env.STITCH_WEBHOOK_SECRET,owner:env.ARI_OWNER_EMAIL,origin:'https://www.smartclasss.com',fingerprint:createHash('sha256').update(id).digest('hex')};
}
export function nextRenewal(now=new Date(),day){
 const local=new Date(+now+7200000),anchor=day||Math.min(local.getUTCDate(),28);
 return new Date(Date.UTC(local.getUTCFullYear(),local.getUTCMonth()+1,anchor,0)-7200000);
}
export function paidUntil(order,paidAt){
 const paid=new Date(paidAt),first=new Date(order.next_renewal);
 if(!Number.isFinite(+paid))throw problem('Invalid payment date');
 return paid<first?first:nextRenewal(paid,order.billing_day);
}
export function subscriptionRequest(order,user){
 return {amount:order.amount,initialAmount:order.amount,merchantReference:order.id,startDate:new Date(order.next_renewal).toISOString(),payerFullName:(user.name||'SmartClass parent').trim().slice(0,20),email:user.email,payerId:String(user.customerId),recurrence:{frequency:'MONTHLY',interval:1,byMonthDay:order.billing_day}};
}
export function newOrder(user,plan,mode,now=new Date()){
 if(!Object.hasOwn(PLANS,plan))throw problem('Choose a valid package.');
 const renewal=nextRenewal(now);
 return {id:'sc_'+randomUUID().replaceAll('-',''),user_id:String(user.customerId),plan,mode,amount:PLANS[plan].cents,next_renewal:renewal,billing_day:new Date(+renewal+7200000).getUTCDate()};
}
const tokens=new Map(),pendingTokens=new Map();
export function createClient(cfg,fetcher=fetch){
 async function request(path,body,scope='client_paymentrequest',method=body?'POST':'GET'){
  const cacheKey=cfg.fingerprint+':'+scope;
  let entry=tokens.get(cacheKey);
  if(!entry||entry.until<Date.now()){
   if(!pendingTokens.has(cacheKey))pendingTokens.set(cacheKey,(async()=>{
    const r=await fetcher('https://express.stitch.money/api/v1/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientId:cfg.id,clientSecret:cfg.secret,scope}),signal:AbortSignal.timeout(15000)});
    const d=await r.json();if(!r.ok||!d.success||!d.data?.accessToken)throw problem('Stitch authentication is unavailable. Please try again later.',503);
    const value={token:d.data.accessToken,until:Date.now()+13*60000};tokens.set(cacheKey,value);return value;
   })().finally(()=>pendingTokens.delete(cacheKey)));
   entry=await pendingTokens.get(cacheKey);
  }
  const response=await fetcher('https://express.stitch.money/api/v1'+path,{method,headers:{Authorization:'Bearer '+entry.token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(20000)});
  const data=await response.json();if(!response.ok||!data.success){if(response.status===401)tokens.delete(cacheKey);throw Object.assign(problem('Stitch could not complete this request. Please try again shortly.',503),{providerStatus:response.status})}
  return data.data;
 }
 return {request,subscription:(body)=>request('/subscriptions',body,'client_recurringpaymentconsentrequest'),cancel:id=>request('/subscriptions/'+encodeURIComponent(id)+'/cancel',{},'client_recurringpaymentconsentrequest'),payment:id=>request('/payment/'+encodeURIComponent(id))};
}
export function verifiedPayment(event,payment,order){
 if(event.type!=='SUBSCRIPTION'||event.subscriptionId!==order.provider_id||event.status!=='PAID')throw problem('Payment does not match the subscription');
 if(!payment||payment.id!==event.id||payment.type!=='SUBSCRIPTION'||!['PAID','SETTLED'].includes(payment.status)||event.amount!==order.amount||payment.amount!==order.amount||payment.merchantReference!==order.id)throw problem('Payment details do not match the order');
 if(!payment.paidAt||!Number.isFinite(Date.parse(payment.paidAt)))throw problem('Payment date missing');
 return paidUntil(order,payment.paidAt);
}
export function checkoutUrl(value,cfg){let u;try{u=new URL(value)}catch{throw problem('Checkout URL is missing',503)}if(u.origin!=='https://express.stitch.money'||!u.pathname.startsWith('/subscribe/'))throw problem('Unexpected checkout address',503);u.searchParams.set('redirect_url',cfg.origin+'/billing-return');return u.toString()}


