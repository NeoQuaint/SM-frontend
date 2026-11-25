import {billingUser,checkPost} from '../lib/billing-auth.js';
import {inspect,connect} from '../lib/stitch-setup.js';
export const maxDuration=60;
export default async function handler(req,res){
 res.setHeader('Cache-Control','private, no-store');
 if(!['GET','POST'].includes(req.method))return res.status(405).end();
 try{const user=await billingUser(req);if(!process.env.ARI_OWNER_EMAIL||user.email.toLowerCase()!==process.env.ARI_OWNER_EMAIL.toLowerCase())return res.status(403).json({error:'Owner access only.'});
  if(req.method==='POST')checkPost(req,user);
  const state=req.method==='POST'?await connect():await inspect();return res.json({...state,csrf:user.csrf});
 }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Setup could not finish. No payment was created.'})}
}
