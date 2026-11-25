import {createHash,randomBytes,randomUUID,timingSafeEqual} from 'node:crypto';
import * as webpush from 'web-push';
import {database} from './stitch-db.js';
import {problem} from './stitch-core.js';
export const hash=value=>createHash('sha256').update(String(value)).digest('hex');
export const configured=()=>!!(process.env.PUSH_VAPID_PUBLIC_KEY&&process.env.PUSH_VAPID_PRIVATE_KEY);
export function validSubscription(input){
 let u;try{u=new URL(input?.endpoint)}catch{throw problem('Invalid notification subscription.')}
 const host=u.hostname;
 if(u.protocol!=='https:'||u.username||u.password||u.port||u.hash||input.endpoint.length>2048||!(host==='fcm.googleapis.com'||host==='web.push.apple.com'||host==='updates.push.services.mozilla.com'||host.endsWith('.push.services.mozilla.com')||host.endsWith('.notify.windows.com')))throw problem('Unsupported notification service.');
 const {p256dh,auth}=input.keys||{};
 if(![p256dh,auth].every(v=>typeof v==='string'&&/^[A-Za-z0-9_-]+={0,2}$/.test(v)&&v.length<100)||Buffer.from(p256dh,'base64url').length!==65||Buffer.from(p256dh,'base64url')[0]!==4||Buffer.from(auth,'base64url').length!==16)throw problem('Invalid notification keys.');
 return {endpoint:u.href,keys:{p256dh,auth}};
}
export function cronAuthorized(value,secret=process.env.CRON_SECRET){const wanted='Bearer '+secret;return !!secret&&typeof value==='string'&&Buffer.byteLength(value)===Buffer.byteLength(wanted)&&timingSafeEqual(Buffer.from(value),Buffer.from(wanted))}
export function reminderDue(p,now=new Date()){return +now-+new Date(p.last_seen)>=3*86400000&&(!p.last_sent||+now-+new Date(p.last_sent)>=7*86400000)&&p.reminder_count<2}
export function payload(test=false){return {title:'SmartClass',body:test?'Your SmartClass reminders are ready. See you for the next adventure!':'Maya’s ready for another adventure. Come explore together!',url:'/kids',tag:test?'smartclass-test':'smartclass-gentle-reminder'}}
let readyPromise;
export async function ready(){return readyPromise ||= database().query(`
 CREATE TABLE IF NOT EXISTS sc_push_preferences(user_id text PRIMARY KEY,last_seen timestamptz NOT NULL DEFAULT NOW(),last_sent timestamptz,reminder_count integer NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS sc_push_devices(id uuid PRIMARY KEY,user_id text NOT NULL REFERENCES sc_push_preferences(user_id) ON DELETE CASCADE,endpoint text UNIQUE NOT NULL,p256dh text NOT NULL,auth text NOT NULL,visit_hash text NOT NULL,consent_at timestamptz NOT NULL DEFAULT NOW(),updated_at timestamptz NOT NULL DEFAULT NOW(),test_at timestamptz);
 CREATE INDEX IF NOT EXISTS sc_push_device_user ON sc_push_devices(user_id);
 `).catch(e=>{readyPromise=null;throw e})}
async function transaction(fn){await ready();const c=await database().connect();try{await c.query('BEGIN');const out=await fn(c);await c.query('COMMIT');return out}catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}}
export async function subscribe(userId,input){const sub=validSubscription(input),token=randomBytes(32).toString('base64url');return transaction(async c=>{
 if(!(await c.query('SELECT 1 FROM users WHERE id::text=$1 AND deletion_started_at IS NULL FOR SHARE',[String(userId)])).rowCount)throw problem('Please sign in to an active account.',401);
   await c.query('SELECT pg_advisory_xact_lock(hashtext($1))',['push:'+userId]);
 const count=(await c.query('SELECT count(*) FROM sc_push_devices WHERE user_id=$1 AND endpoint!=$2',[userId,sub.endpoint])).rows[0].count;if(Number(count)>=5)throw problem('Reminders are already enabled on five devices. Turn one off first.',409);
 await c.query('INSERT INTO sc_push_preferences(user_id) VALUES($1) ON CONFLICT(user_id) DO UPDATE SET last_seen=NOW(),reminder_count=0',[userId]);
 const row=(await c.query(`INSERT INTO sc_push_devices(id,user_id,endpoint,p256dh,auth,visit_hash) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(endpoint) DO UPDATE SET user_id=EXCLUDED.user_id,p256dh=EXCLUDED.p256dh,auth=EXCLUDED.auth,visit_hash=EXCLUDED.visit_hash,consent_at=NOW(),updated_at=NOW() RETURNING id`,[randomUUID(),userId,sub.endpoint,sub.keys.p256dh,sub.keys.auth,hash(token)])).rows[0];
 await c.query('DELETE FROM sc_push_preferences p WHERE NOT EXISTS(SELECT 1 FROM sc_push_devices d WHERE d.user_id=p.user_id)');return {deviceId:row.id,visitToken:token};
})}
export async function deviceAction(action,id,token){if(typeof id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)||typeof token!=='string'||token.length!==43)throw problem('Invalid device request.',400);return transaction(async c=>{
 const d=(await c.query('SELECT user_id FROM sc_push_devices WHERE id=$1 AND visit_hash=$2 FOR UPDATE',[id,hash(token)])).rows[0];if(!d)return {enabled:false};
 if(action==='visit'){await c.query('UPDATE sc_push_preferences SET last_seen=NOW(),reminder_count=0 WHERE user_id=$1',[d.user_id]);return {enabled:true}}
 await c.query('DELETE FROM sc_push_devices WHERE id=$1',[id]);await c.query('DELETE FROM sc_push_preferences p WHERE user_id=$1 AND NOT EXISTS(SELECT 1 FROM sc_push_devices d WHERE d.user_id=p.user_id)',[d.user_id]);return {enabled:false};
})}
export async function removeDevice(id){await database().query('DELETE FROM sc_push_devices WHERE id=$1',[id])}
export async function send(device,test=false){validSubscription({endpoint:device.endpoint,keys:{p256dh:device.p256dh,auth:device.auth}});return webpush.sendNotification({endpoint:device.endpoint,keys:{p256dh:device.p256dh,auth:device.auth}},JSON.stringify(payload(test)),{vapidDetails:{subject:'mailto:support@smartclassedu.com',publicKey:process.env.PUSH_VAPID_PUBLIC_KEY,privateKey:process.env.PUSH_VAPID_PRIVATE_KEY},TTL:3600,urgency:'normal',topic:test?'smartclass-test':'smartclass-reminder',timeout:8000})}
export async function testDevice(userId,id){if(typeof id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))throw problem('Invalid device.',400);await ready();const d=(await database().query("UPDATE sc_push_devices SET test_at=NOW() WHERE id=$1 AND user_id=$2 AND (test_at IS NULL OR test_at<NOW()-INTERVAL '5 minutes') RETURNING *",[id,userId])).rows[0];if(!d)throw problem('Enable this device first, or wait five minutes before another test.',429);try{await send(d,true)}catch(e){if([404,410].includes(e.statusCode))await removeDevice(d.id);throw problem('The notification could not be delivered. Try turning reminders off and on again.',503)}}
export async function runReminders(sendFn=send){await ready();
 await database().query("DELETE FROM sc_push_preferences WHERE last_seen<NOW()-INTERVAL '90 days'");
 await database().query('DELETE FROM sc_push_preferences p WHERE NOT EXISTS(SELECT 1 FROM sc_push_devices d WHERE d.user_id=p.user_id)');
 // A claimed attempt counts even if the provider times out: never retry an ambiguous send.
 const claimed=await transaction(async c=>(await c.query(`WITH eligible AS(SELECT user_id FROM sc_push_preferences WHERE last_seen<NOW()-INTERVAL '3 days' AND (last_sent IS NULL OR last_sent<NOW()-INTERVAL '7 days') AND reminder_count<2 ORDER BY last_seen LIMIT 100 FOR UPDATE SKIP LOCKED) UPDATE sc_push_preferences p SET last_sent=NOW(),reminder_count=reminder_count+1 FROM eligible e WHERE p.user_id=e.user_id RETURNING p.user_id,p.last_sent`)).rows);
 let delivered=0,expired=0,failed=0;
 for(let start=0;start<claimed.length;start+=10)await Promise.all(claimed.slice(start,start+10).map(async p=>{
  const d=(await database().query(`SELECT d.* FROM sc_push_devices d JOIN sc_push_preferences p ON p.user_id=d.user_id WHERE d.user_id=$1 AND p.last_seen<NOW()-INTERVAL '3 days' ORDER BY d.updated_at DESC LIMIT 1`,[p.user_id])).rows[0];if(!d)return;
  try{await sendFn(d);delivered++}catch(e){if([404,410].includes(e.statusCode)){await removeDevice(d.id);expired++}else failed++}
 }));return {attempted:claimed.length,delivered,expired,failed};
}

