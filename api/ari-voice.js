import {currentUser,checkRequest,privateHeaders} from './ari-auth.js';
export const maxDuration=60;
export function wavBuffer(base64){
 if(typeof base64!=='string'||base64.length<60||base64.length>2600000||!/^[A-Za-z0-9+/]+={0,2}$/.test(base64))return null;
 const b=Buffer.from(base64,'base64');if(b.length<46||b.length>1920044)return null;
 if(b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WAVE'||b.toString('ascii',12,16)!=='fmt '||b.readUInt32LE(16)!==16||b.readUInt16LE(20)!==1||b.readUInt16LE(22)!==1||b.readUInt32LE(24)!==16000||b.readUInt16LE(34)!==16||b.toString('ascii',36,40)!=='data'||b.readUInt32LE(40)!==b.length-44||b.readUInt32LE(4)!==b.length-8||(b.length-44)%2)return null;
 return b;
}
export function createHandler({authenticate=currentUser,csrf=checkRequest,fetchAPI=fetch}={}){return async(req,res)=>{
privateHeaders(res);if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'})}
if(!await authenticate(req))return res.status(401).json({error:'Please sign in to use voice mode.'});
let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body}catch{return res.status(400).json({error:'Invalid request'})}
if(!await csrf(req,body))return res.status(403).json({error:'Please reopen voice mode and try again.'});
if(!['speak','transcribe'].includes(body?.action))return res.status(400).json({error:'Invalid voice action'});
let url,options;
if(body.action==='transcribe'){
 const audio=wavBuffer(body.audio);if(!audio)return res.status(400).json({error:'Record up to 60 seconds of speech and try again.'});
 if(!process.env.DEEPSEEK_API_KEY)return res.status(503).json({error:'Speech recognition is not connected yet.'});
 const form=new FormData();form.append('file',new Blob([audio],{type:'audio/wav'}),'turn.wav');url='https://api.deepseek.com/v1/tools/asr';options={method:'POST',headers:{Authorization:'Bearer '+process.env.DEEPSEEK_API_KEY},body:form};
}else{
 if(typeof body.text!=='string'||!body.text.trim()||body.text.length>600)return res.status(400).json({error:'Speech text must be between 1 and 600 characters.'});
 if(!process.env.DEEPINFRA_API_KEY)return res.status(503).json({error:'Ari’s Kokoro voice is not connected yet.'});
 const maleVoices=new Set(['af_heart','am_michael','am_fenrir','am_onyx','bm_george','bm_daniel']);const voice=maleVoices.has(process.env.ARI_KOKORO_VOICE)?process.env.ARI_KOKORO_VOICE:'af_heart';
 url='https://api.deepinfra.com/v1/text-to-speech/'+voice;options={method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+process.env.DEEPINFRA_API_KEY},body:JSON.stringify({text:body.text.trim(),model_id:'hexgrad/Kokoro-82M',output_format:'mp3'})};
}
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);const close=()=>controller.abort();res.on?.('close',close);
try{const r=await fetchAPI(url,{...options,signal:controller.signal});if(!r.ok)return res.status(r.status===429?429:502).json({error:r.status===429?'Voice is busy. Try again in a moment.':'Could not process this voice turn. Please try again.'});
 if(body.action==='transcribe'){const result=await r.json();const text=typeof result.text==='string'?result.text.trim().slice(0,16000):'';if(!text)return res.status(422).json({error:'I didn’t catch that. Tap the orb and try again.'});return res.status(200).json({text})}
 const audio=Buffer.from(await r.arrayBuffer());if(audio.length<100||audio.length>8000000)throw Error('audio');res.setHeader('Content-Type','audio/mpeg');res.setHeader('Content-Length',audio.length);return res.status(200).end(audio);
}catch{if(!res.destroyed)return res.status(502).json({error:controller.signal.aborted?'Voice took too long. Please try again.':'Voice connection interrupted. Please try again.'})}finally{clearTimeout(timer);res.off?.('close',close)}
}}
export default createHandler();
