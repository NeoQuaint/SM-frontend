import {activeAccount} from './account-deletion.js';
import {jwtVerify} from 'jose';
import {createHmac,timingSafeEqual} from 'node:crypto';
import {problem} from './stitch-core.js';
export async function billingUser(req,{lookup=activeAccount,allowDeleting=false}={}){
 const secret=process.env.AUTH_SESSION_SECRET;if(!secret)throw problem('Please sign in.',401);
 const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('__Host-sc-parent='))?.slice('__Host-sc-parent='.length);
 try{const {payload:p}=await jwtVerify(token,new TextEncoder().encode(secret),{issuer:'smartclass',audience:'smartclass-parent',algorithms:['HS256']});if(!p.customerId||!p.email||!await lookup(p.customerId,p.email,allowDeleting))throw Error();return {id:p.sub,customerId:p.customerId,email:p.email,name:p.name,csrf:createHmac('sha256',secret).update('billing:'+token).digest('hex')}}catch{throw problem('Please sign in to manage your package.',401)}
}
export function checkPost(req,user){
 if(!['https://www.smartclasss.com','https://smartclasss.com'].includes(req.headers.origin)||req.headers['sec-fetch-site']==='cross-site')throw problem('Request not allowed',403);
 if(!String(req.headers['content-type']||'').startsWith('application/json'))throw problem('JSON required',415);
 const token=req.headers['x-csrf-token'];if(typeof token!=='string'||token.length!==user.csrf.length||!timingSafeEqual(Buffer.from(token),Buffer.from(user.csrf)))throw problem('Please refresh and try again.',403);
}
