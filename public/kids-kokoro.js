(()=>{
'use strict';
const endpoint='/api/kokoro',voice={name:'Kokoro Heart',lang:'en-US',voiceURI:'kokoro-af-heart',default:true,localService:false};
let current=null,serial=0,queue=[];
const memory=new Map(),normal=s=>String(s).trim().replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ');
class Utterance{constructor(text=''){this.text=String(text);this.rate=1;this.volume=1;this.voice=voice;this.lang='en-US'}}
function bundled(text){const clips=window.KOKORO_CLIPS||{};if(clips[text])return clips[text];const key=normal(text).toLowerCase().replace(/[.!?]+$/,'');for(const [t,url] of Object.entries(clips))if(normal(t).toLowerCase().replace(/[.!?]+$/,'')===key)return url;return null}
async function remote(text,signal){
const clean=normal(text);if(memory.has(clean))return memory.get(clean);
const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(clean)))].map(x=>x.toString(16).padStart(2,'0')).join('');
const key=new URL('/__kokoro-heart/'+hash,location.origin).href;let cache=null,reply=null;
try{cache=await caches.open('smartclass-kokoro-heart-v1');reply=await cache.match(key)}catch{}
if(!reply){reply=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:clean}),signal});if(!reply.ok||!(reply.headers.get('content-type')||'').includes('audio'))throw Error('Kokoro unavailable');if(cache){try{await cache.put(key,reply.clone());const keys=await cache.keys();for(const k of keys.slice(0,Math.max(0,keys.length-150)))await cache.delete(k)}catch{}}}
const blob=await reply.blob();if(blob.size<100)throw Error('Empty narration');const url=URL.createObjectURL(blob);memory.set(clean,url);if(memory.size>40){const first=memory.keys().next().value;URL.revokeObjectURL(memory.get(first));memory.delete(first)}return url;
}
function notice(text,retry){let box=document.getElementById('kokoro-status');if(!box){box=document.createElement('div');box.id='kokoro-status';box.setAttribute('role','status');box.style.cssText='position:fixed;bottom:14px;left:5%;right:5%;z-index:99999;padding:12px 18px;background:#fff6d8;color:#333;border-radius:18px;font:14px sans-serif;text-align:center;box-shadow:0 3px 20px #0002';}const host=[...document.querySelectorAll('dialog[open]')].at(-1)||document.body;host.append(box);box.replaceChildren(document.createTextNode(text));box.hidden=!text;if(retry){const b=document.createElement('button');b.textContent='Listen again';b.style.marginLeft='12px';b.onclick=()=>{box.hidden=true;speak(retry)};box.append(b)}}
function emit(u,type,data={}){u['on'+type]?.({type,target:u,...data})}
function cancel(){serial++;queue=[];if(current){current.controller.abort();current.audio?.pause();current.audio?.removeAttribute('src');current=null}window.KidsSound?.duck(false);notice('')}
function speak(u){if(!u?.text?.trim())return;queue.push(u);pump()}
async function pump(){if(current||!queue.length)return;const u=queue.shift();if(document.hidden||document.getElementById('sound')?.getAttribute('aria-pressed')==='false'){emit(u,'error',{error:'canceled'});return}const id=++serial,controller=new AbortController(),job={u,controller,audio:null};current=job;notice('');let deadline=setTimeout(()=>controller.abort(),60000);
try{let src=bundled(u.text);if(!src){notice('Getting the narrator ready…');src=await remote(u.text,controller.signal)}if(id!==serial)return;clearTimeout(deadline);notice('');const audio=new Audio(src);job.audio=audio;audio.playbackRate=Math.min(1.3,Math.max(.65,Number(u.rate)||1));audio.preservesPitch=true;audio.volume=Math.min(1,Math.max(0,u.volume??1));const words=[...u.text.matchAll(/\S+/g)];let last=-1;
const finish=(error)=>{if(id!==serial||job.done)return;job.done=true;audio.pause();current=null;window.KidsSound?.duck(false);if(error){notice('The narrator could not play. Tap to try again.',u);emit(u,'error',{error:'audio-unavailable'})}else emit(u,'end');pump()};
audio.onplaying=()=>{if(id!==serial)return;window.KidsSound?.duck(true);emit(u,'start')};
// Kokoro returns audio without word timestamps. Highlighting follows proportional audio progress.
audio.ontimeupdate=()=>{if(id!==serial||!Number.isFinite(audio.duration)||!words.length)return;const target=audio.currentTime/audio.duration*u.text.length;let i=0;while(i+1<words.length&&words[i+1].index<=target)i++;if(i!==last){last=i;emit(u,'boundary',{name:'word',charIndex:words[i].index})}};
audio.onended=()=>finish();audio.onerror=()=>finish(true);await audio.play();
}catch(error){if(id!==serial||job.done)return;job.done=true;current=null;clearTimeout(deadline);window.KidsSound?.duck(false);notice('The narrator could not connect. Tap to try again.',u);emit(u,'error',{error:'network'});pump()}}
window.KidsVoice={Utterance,speak,cancel,getVoices:()=>[voice],get speaking(){return !!current},get pending(){return !!queue.length},pause(){current?.audio?.pause()},resume(){current?.audio?.play().catch(()=>{})},async preload(text){if(bundled(text))return;const c=new AbortController(),t=setTimeout(()=>c.abort(),60000);try{await remote(text,c.signal)}catch{}finally{clearTimeout(t)}}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel()});window.addEventListener('pagehide',cancel);document.addEventListener('click',e=>{if(e.target.closest('#sound')&&document.getElementById('sound')?.getAttribute('aria-pressed')==='false')cancel()});
})();
