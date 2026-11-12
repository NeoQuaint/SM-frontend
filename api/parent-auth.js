import {randomBytes,timingSafeEqual} from 'node:crypto';
import {createRemoteJWKSet,jwtVerify,SignJWT} from 'jose';
const keys=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const sessionCookie='__Host-sc-parent',challengeCookie='__Host-sc-challenge';
const allowed=new Set(['https://smartclasss.com','https://www.smartclasss.com']);
const cookie=(name,value,age)=>name+'='+value+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age='+age;
const cookies=req=>Object.fromEntries((req.headers.cookie||'').split(';').map(x=>x.trim().split('=')));
const equal=(a,b)=>typeof a==='string'&&typeof b==='string'&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
export function createHandler({verifyGoogle=async(token,audience)=>{const {payload}=await jwtVerify(token,keys,{audience,issuer:['https://accounts.google.com','accounts.google.com'],algorithms:['RS256']});return payload}}={}){return async function handler(req,res){
res.setHeader('Cache-Control','no-store');res.setHeader('Vary','Cookie');
const clientId=process.env.GOOGLE_CLIENT_ID,secret=process.env.AUTH_SESSION_SECRET;
const ready=!!clientId&&!!secret&&secret.length>=32;
const key=new TextEncoder().encode(secret||'');const stored=cookies(req);
async function user(){if(!ready||!stored[sessionCookie])return null;try{const {payload:p}=await jwtVerify(stored[sessionCookie],key,{issuer:'smartclass',audience:'smartclass-parent',algorithms:['HS256']});return {id:p.sub,name:p.name,email:p.email}}catch{return null}}
if(req.method==='GET'){
if(!ready)return res.status(200).json({configured:false,user:null});
const nonce=randomBytes(24).toString('base64url');const challenge=await new SignJWT({nonce}).setProtectedHeader({alg:'HS256'}).setIssuer('smartclass').setAudience('parent-login').setIssuedAt().setExpirationTime('10m').sign(key);
res.setHeader('Set-Cookie',cookie(challengeCookie,challenge,600));return res.status(200).json({configured:true,clientId,csrf:nonce,user:await user()});
}
if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'});}
if(!allowed.has(req.headers.origin)||req.headers['sec-fetch-site']==='cross-site')return res.status(403).json({error:'Request not allowed'});
if(!ready)return res.status(503).json({error:'Google sign-in is not available yet. Please try again later.'});
if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'JSON required'});
let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body||JSON.stringify(body).length>20000)throw Error()}catch{return res.status(400).json({error:'Invalid request'})}
let challenge;try{challenge=(await jwtVerify(stored[challengeCookie]||'',key,{issuer:'smartclass',audience:'parent-login',algorithms:['HS256']})).payload;if(!equal(body.csrf,challenge.nonce))throw Error()}catch{return res.status(403).json({error:'Please reopen sign-in and try again.'})}
if(body.action==='logout'){res.setHeader('Set-Cookie',[cookie(sessionCookie,'',0),cookie(challengeCookie,'',0)]);return res.status(200).json({user:null})}
if(body.action!=='login'||typeof body.credential!=='string'||body.credential.length>16000)return res.status(400).json({error:'Invalid request'});
try{const p=await verifyGoogle(body.credential,clientId);if(!p.sub||typeof p.sub!=='string'||!equal(p.nonce,challenge.nonce))throw Error();const account={id:p.sub,name:String(p.name||'Parent').slice(0,100),email:String(p.email||'').slice(0,254)};const session=await new SignJWT({name:account.name,email:account.email}).setProtectedHeader({alg:'HS256'}).setSubject(account.id).setIssuer('smartclass').setAudience('smartclass-parent').setIssuedAt().setExpirationTime('7d').sign(key);res.setHeader('Set-Cookie',[cookie(sessionCookie,session,604800),cookie(challengeCookie,'',0)]);return res.status(200).json({user:account})}catch{return res.status(401).json({error:'Google sign-in could not be verified. Please try again.'})}
}}
export default createHandler();
