import {deliverMail} from '../lib/mail.js';
import {configured} from '../lib/stitch-setup.js';
import {Webhook} from 'svix';
import {config as stitchConfig,createClient,verifiedPayment,PLANS} from '../lib/stitch-core.js';
import {settle} from '../lib/stitch-db.js';
export const config={api:{bodyParser:false}};
export const maxDuration=60;
export function createWebhookHandler({getConfig=configured,getClient=createClient,settlePayment=settle}={}){return async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).end();
 let cfg;try{cfg=await getConfig()}catch{return res.status(503).json({error:'Webhook not configured'})}
 let raw=Buffer.alloc(0);
 try{for await(const chunk of req){raw=Buffer.concat([raw,Buffer.from(chunk)]);if(raw.length>65536)return res.status(413).end()}}catch{return res.status(400).end()}
 let event;try{await new Webhook(cfg.webhookSecret).verify(raw.toString('utf8'),{'svix-id':req.headers['svix-id'],'svix-timestamp':req.headers['svix-timestamp'],'svix-signature':req.headers['svix-signature']});event=JSON.parse(raw.toString('utf8'))}catch{return res.status(400).json({error:'Invalid signature'})}
 if(event?.type!=='SUBSCRIPTION')return res.status(200).json({ignored:true});
 if(typeof event.id!=='string'||event.id.length>200||typeof event.subscriptionId!=='string'||event.subscriptionId.length>200||event.status!=='PAID')return res.status(400).json({error:'Invalid payment event'});
 try{
  const {payment}=await getClient(cfg).payment(event.id);
  const outcome=await settlePayment(event,req.headers['svix-id'],payment,cfg.mode,verifiedPayment,PLANS);
  if(cfg.mode==='live'&&process.env.BILLING_EMAIL_PASSWORD)try{await deliverMail(1)}catch{}
  return res.status(200).json({received:true,...outcome});
 }catch(e){return res.status(e.status||503).json({error:'Payment verification pending'})}
}

}
export default createWebhookHandler();



