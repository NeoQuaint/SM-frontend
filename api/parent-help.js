import {deliverMail} from '../lib/mail.js';
import {billingUser,checkPost} from '../lib/billing-auth.js';
import {database} from '../lib/stitch-db.js';
export function validate(body){
 if(!body||!['message','deletion'].includes(body.action)||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(body.id||''))throw Error('Please reopen the form.');
 const message=typeof body.message==='string'?body.message.trim():'';
 if(message.length>12000||message.split(/\s+/u).filter(Boolean).length>400)throw Error('Please keep your message to 400 words.');
 if(body.action==='message'&&!message)throw Error('Please write a message.');
 if(body.action==='deletion'&&body.confirm!==true)throw Error('Please confirm your deletion request.');
 return {id:body.id,action:body.action,message};
}
export default async function handler(req,res){
 res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Method not allowed'});
 try{
  const user=await billingUser(req);
  if(req.method==='GET')return res.status(200).json({csrf:user.csrf});
  checkPost(req,user);let v;try{const body=typeof req.body==='string'?JSON.parse(req.body):req.body;v=validate(body)}catch(e){return res.status(400).json({error:e.message})}
  const c=await database().connect();try{
   await c.query('BEGIN');await c.query('SELECT pg_advisory_xact_lock(hashtext($1))',['parent-help:'+user.customerId]);
   const existing=await c.query('SELECT 1 FROM smartclass_feedback WHERE submission_id=$1 AND email=$2',[v.id,user.email]);
   if(!existing.rowCount){
    const recent=await c.query("SELECT COUNT(*)::int AS count FROM smartclass_feedback WHERE email=$1 AND created_at>NOW()-INTERVAL '15 minutes'",[user.email]);
    if(recent.rows[0].count>=3){await c.query('ROLLBACK');return res.status(429).json({error:'Please wait a few minutes before sending another message.'})}
    await c.query(`INSERT INTO smartclass_feedback(submission_id,usage_reason,payment_reason,other_reason,comments,contact_consent,email) VALUES($1,'other','other',$2,$3,true,$4)`,[v.id,v.action==='deletion'?'ACCOUNT DELETION REQUEST':'Parent contact message',v.action==='deletion'?'Please delete my SmartClass account. Please review any active subscription and contact me to confirm completion.':v.message,user.email]);
   }
   await c.query('COMMIT');if(process.env.SUPPORT_EMAIL_PASSWORD)try{await deliverMail(1)}catch{}return res.status(200).json({received:true});
  }catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}
 }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Your request could not be saved. Please try again.'})}
}
