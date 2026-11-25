import {createCipheriv,createDecipheriv,createHash,randomBytes} from 'node:crypto';
import {config,createClient,problem} from './stitch-core.js';
import {database,ready} from './stitch-db.js';
function key(){if(!process.env.AUTH_SESSION_SECRET)throw problem('Server authentication is not configured.',503);return createHash('sha256').update('stitch-webhook:'+process.env.AUTH_SESSION_SECRET).digest()}
export function seal(value){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv);const encrypted=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString('base64')}
export function unseal(value){const data=Buffer.from(value,'base64'),decipher=createDecipheriv('aes-256-gcm',key(),data.subarray(0,12));decipher.setAuthTag(data.subarray(12,28));return Buffer.concat([decipher.update(data.subarray(28)),decipher.final()]).toString('utf8')}
async function setupTable(){await ready();await database().query('CREATE TABLE IF NOT EXISTS sc_stitch_configuration (fingerprint text PRIMARY KEY, webhook_cipher text, registration_started boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT NOW())')}
export async function configured(){const cfg=config(process.env,{requireWebhook:false});if(cfg.webhookSecret)return cfg;await setupTable();const row=(await database().query('SELECT webhook_cipher FROM sc_stitch_configuration WHERE fingerprint=$1',[cfg.fingerprint])).rows[0];if(!row?.webhook_cipher)throw problem('Payments are being connected. Please try again later.',503);return {...cfg,webhookSecret:unseal(row.webhook_cipher)}}
export async function inspect(){const cfg=config(process.env,{requireWebhook:false});await setupTable();let webhook=false;try{await configured();webhook=true}catch{}return {mode:cfg.mode,webhook,liveEnabled:process.env.STITCH_LIVE_ENABLED==='true',ownerCheckoutEnabled:process.env.STITCH_LIVE_ENABLED==='owner'}}
export async function connect(){
 const cfg=config(process.env,{requireWebhook:false}),client=createClient(cfg);await setupTable();
 // Read-only calls verify both required API scopes before registering anything.
 const redirects=await client.request('/redirect-urls');
 await client.request('/subscriptions?limit=1',undefined,'client_recurringpaymentconsentrequest');
 const redirect=cfg.origin+'/billing-return';
 if(!redirects.redirectUrls?.includes(redirect))await client.request('/redirect-urls',{redirectUrl:redirect});
 const c=await database().connect();
 try{
  await c.query('SELECT pg_advisory_lock(hashtext($1))',['stitch-setup:'+cfg.fingerprint]);
  const row=(await c.query('SELECT * FROM sc_stitch_configuration WHERE fingerprint=$1',[cfg.fingerprint])).rows[0];
  if(cfg.webhookSecret||row?.webhook_cipher)return {...await inspect(),authenticated:true};
  if(row?.registration_started)throw problem('Webhook registration needs review. Check the Stitch dashboard before retrying; its signing secret is shown only once.',409);
  await c.query('INSERT INTO sc_stitch_configuration(fingerprint,registration_started) VALUES($1,true)',[cfg.fingerprint]);
  let result;try{result=await client.request('/webhook',{url:cfg.origin+'/api/stitch-webhook'})}catch(e){if(e.providerStatus&&e.providerStatus!==409&&e.providerStatus<500)await c.query('DELETE FROM sc_stitch_configuration WHERE fingerprint=$1 AND webhook_cipher IS NULL',[cfg.fingerprint]);throw problem('Webhook registration could not be confirmed. Check Stitch before retrying.',503)}
  if(typeof result?.secret!=='string'||!result.secret.startsWith('whsec_'))throw problem('Stitch did not return a valid signing secret. Contact support before retrying.',503);
  // Persist the one-time secret encrypted; it never reaches the browser or logs.
  await c.query('UPDATE sc_stitch_configuration SET webhook_cipher=$2,updated_at=NOW() WHERE fingerprint=$1',[cfg.fingerprint,seal(result.secret)]);
  return {...await inspect(),authenticated:true};
 }finally{await c.query('SELECT pg_advisory_unlock(hashtext($1))',['stitch-setup:'+cfg.fingerprint]);c.release()}
}
