import {billingUser,checkPost} from '../lib/billing-auth.js';
import {configured,subscribe,deviceAction,testDevice} from '../lib/push.js';
export default async function handler(req,res){res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');
 if(!['GET','POST'].includes(req.method))return res.status(405).end();
 try{
  if(req.method==='GET'){const user=await billingUser(req);return res.json({configured:configured(),publicKey:process.env.PUSH_VAPID_PUBLIC_KEY||null,csrf:user.csrf})}
  if(!['https://www.smartclasss.com','https://smartclasss.com'].includes(req.headers.origin)||req.headers['sec-fetch-site']==='cross-site')return res.status(403).json({error:'Request not allowed.'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).end();
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body||JSON.stringify(body).length>6000)throw Error()}catch{return res.status(400).json({error:'Invalid request.'})}
  if(['visit','off'].includes(body.action))return res.json(await deviceAction(body.action,body.deviceId,body.visitToken));
  const user=await billingUser(req);checkPost(req,user);
  if(!configured())return res.status(503).json({error:'Reminders are not configured yet.'});
  if(body.action==='subscribe'&&body.consent===true)return res.json({enabled:true,...await subscribe(String(user.customerId),body.subscription)});
  if(body.action==='test'){await testDevice(String(user.customerId),body.deviceId);return res.json({sent:true})}
  return res.status(400).json({error:'Choose a valid notification action.'});
 }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Reminders are temporarily unavailable.'})}
}
