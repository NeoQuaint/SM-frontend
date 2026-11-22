import {currentUser,checkRequest,privateHeaders} from './ari-auth.js';
import {systemPrompt} from '../lib/ari-persona.js';
export const maxDuration=60;
export function validMessages(value){return Array.isArray(value)&&value.length>0&&value.length<=40&&value.at(-1)?.role==='user'&&value.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string'&&m.content.trim().length>0&&m.content.length<=16000)&&value.reduce((n,m)=>n+m.content.length,0)<=64000}
export function createHandler({fetchAPI=fetch,authenticate=currentUser,csrf=checkRequest}={}){return async(req,res)=>{
privateHeaders(res);if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'})}
if(!await authenticate(req))return res.status(401).json({error:'Please sign in to your private space.'});
let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body}catch{return res.status(400).json({error:'Invalid request'})}
if(!await csrf(req,body))return res.status(403).json({error:'Please refresh and try again.'});
if(!validMessages(body?.messages))return res.status(400).json({error:'This conversation is too long. Start a new chat, or shorten your message.'});
if(!process.env.DEEPSEEK_API_KEY)return res.status(503).json({error:'The DeepSeek connection is not configured yet.'});
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),50000);const disconnected=()=>controller.abort();res.on?.('close',disconnected);let streaming=false;
const send=data=>{if(!res.destroyed)res.write('data: '+JSON.stringify(data)+'\n\n')};
try{
 const upstream=await fetchAPI('https://api.deepseek.com/chat/completions',{method:'POST',signal:controller.signal,headers:{Authorization:'Bearer '+process.env.DEEPSEEK_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.DEEPSEEK_MODEL||'deepseek-flash',stream:true,thinking:{type:'disabled'},max_tokens:body.voice===true?768:4096,messages:[{role:'system',content:systemPrompt(body.voice===true)},...body.messages.map(({role,content})=>({role,content}))]})});
 if(!upstream.ok||!upstream.body)return res.status(upstream.status===429?429:502).json({error:upstream.status===429?'DeepSeek is busy. Please try again shortly.':'Could not reach DeepSeek. Check the API key and account balance.'});
 res.setHeader('Content-Type','text/event-stream; charset=utf-8');res.setHeader('X-Accel-Buffering','no');res.flushHeaders?.();streaming=true;
 const reader=upstream.body.getReader(),decoder=new TextDecoder();let buffer='',complete=false,output=0;
 while(!complete){const {done,value}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});const lines=buffer.split('\n');buffer=lines.pop();for(const line of lines){if(!line.startsWith('data:'))continue;const data=line.slice(5).trim();if(data==='[DONE]'){complete=true;break}let chunk;try{chunk=JSON.parse(data)}catch{continue}if(chunk.error)throw Error('upstream');const choice=chunk.choices?.[0];const text=choice?.delta?.content;if(typeof text==='string'&&text){output+=text.length;if(output>50000)throw Error('length');send({type:'token',text})}if(choice?.finish_reason==='length')send({type:'notice',text:'Response reached its length limit. Ask me to continue.'})}}
 if(!complete||!output)throw Error('incomplete');send({type:'done'});res.end();
}catch{if(!res.destroyed){const error=controller.signal.aborted?'The response timed out. Please try again.':'The connection was interrupted. Please try again.';if(streaming){send({type:'error',error});res.end()}else res.status(502).json({error})}}
finally{clearTimeout(timer);res.off?.('close',disconnected)}
}}
export default createHandler();
