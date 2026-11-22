import {randomBytes,timingSafeEqual} from 'node:crypto';
import {createRemoteJWKSet,jwtVerify,SignJWT} from 'jose';
const jwks=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
export const origins=new Set(['https://smartclasss.com','https://www.smartclasss.com']);
const SESSION='__Host-sc-ari',CHALLENGE='__Host-sc-ari-challenge';
const cookie=(name,value,age)=>`${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;
const readCookies=req=>Object.fromEntries((req.headers.cookie||'').split(';').map(c=>c.trim().split('=')));
const key=()=>new TextEncoder().encode(process.env.AUTH_SESSION_SECRET||'');
const owner=()=>String(process.env.ARI_OWNER_EMAIL||'').trim().toLowerCase();
export const configured=()=>!!owner()&&!!process.env.GOOGLE_CLIENT_ID&&(process.env.AUTH_SESSION_SECRET||'').length>=32;
export function privateHeaders(res){res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('X-Content-Type-Options','nosniff')}
export async function currentUser(req){if(!configured())return null;try{const {payload:p}=await jwtVerify(readCookies(req)[SESSION]||'',key(),{issuer:'smartclass-ari',audience:'ari-owner',algorithms:['HS256']});if(p.email!==owner()||!p.sub)return null;return {id:p.sub,name:p.name,email:p.email}}catch{return null}}
export async function checkRequest(req,body){if(!origins.has(req.headers.origin)||req.headers['sec-fetch-site']==='cross-site')return false;if(!String(req.headers['content-type']||'').startsWith('application/json'))return false;try{const {payload:p}=await jwtVerify(readCookies(req)[CHALLENGE]||'',key(),{issuer:'smartclass-ari',audience:'ari-challenge',algorithms:['HS256']});const a=Buffer.from(String(body?.csrf||'')),b=Buffer.from(p.nonce);return a.length===b.length&&timingSafeEqual(a,b)}catch{return false}}
export function createHandler({verifyGoogle=async(token,audience)=>(await jwtVerify(token,jwks,{audience,issuer:['accounts.google.com','https://accounts.google.com'],algorithms:['RS256']})).payload}={}){return async(req,res)=>{
privateHeaders(res);
if(req.method==='GET'){
 if(!configured())return res.status(200).json({configured:false,user:null});
 const nonce=randomBytes(24).toString('base64url');const challenge=await new SignJWT({nonce}).setProtectedHeader({alg:'HS256'}).setIssuer('smartclass-ari').setAudience('ari-challenge').setIssuedAt().setExpirationTime('10m').sign(key());
 res.setHeader('Set-Cookie',cookie(CHALLENGE,challenge,600));const user=await currentUser(req);return res.status(200).json({configured:true,clientId:process.env.GOOGLE_CLIENT_ID,csrf:nonce,user,ready:user?!!process.env.DEEPSEEK_API_KEY:undefined,voiceReady:user?!!process.env.DEEPINFRA_API_KEY&&!!process.env.DEEPSEEK_API_KEY:undefined});
}
if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'})}
if(!configured())return res.status(503).json({error:'Private access is not configured yet.'});
let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body||JSON.stringify(body).length>20000)throw Error()}catch{return res.status(400).json({error:'Invalid request'})}
if(!await checkRequest(req,body))return res.status(403).json({error:'Please refresh and try again.'});
if(body.action==='logout'){res.setHeader('Set-Cookie',[cookie(SESSION,'',0),cookie(CHALLENGE,'',0)]);return res.status(200).json({user:null})}
if(body.action!=='login'||typeof body.credential!=='string')return res.status(400).json({error:'Invalid request'});
try{const p=await verifyGoogle(body.credential,process.env.GOOGLE_CLIENT_ID);if(!p.sub||p.nonce!==body.csrf||p.email_verified!==true||String(p.email||'').toLowerCase()!==owner())return res.status(403).json({error:'This space is reserved for its owner. Choose your authorised Google account.'});
 const user={id:p.sub,name:String(p.given_name||p.name||'').slice(0,80),email:owner()};const session=await new SignJWT({name:user.name,email:user.email}).setProtectedHeader({alg:'HS256'}).setSubject(user.id).setIssuer('smartclass-ari').setAudience('ari-owner').setIssuedAt().setExpirationTime('12h').sign(key());res.setHeader('Set-Cookie',cookie(SESSION,session,43200));return res.status(200).json({user,ready:!!process.env.DEEPSEEK_API_KEY});
}catch{return res.status(401).json({error:'Sign-in could not be verified. Please try again.'})}
}}
export default createHandler();
