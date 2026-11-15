(()=>{
const LOOP_SECONDS=22,LEVEL=.16,VOICE_LEVEL=.055;
let ctx,bus,buffer,pending,source,watch,state=()=>({}),generation=0;
function silence(){if(source){try{source.stop()}catch{}source.disconnect();source=null}}
function stop(){generation++;clearInterval(watch);watch=null;silence()}
async function load(){
 if(buffer)return buffer;
 if(!pending)pending=fetch('find-game-music.mp3').then(r=>{if(!r.ok)throw Error('Find music unavailable');return r.arrayBuffer()}).then(data=>ctx.decodeAudioData(data)).then(decoded=>{
 // A sample-accurate cut: nothing after 00:22 enters the looping buffer.
 const frames=Math.min(decoded.length,Math.round(decoded.sampleRate*LOOP_SECONDS));
 const cut=ctx.createBuffer(decoded.numberOfChannels,frames,decoded.sampleRate);
 for(let c=0;c<decoded.numberOfChannels;c++)cut.copyToChannel(decoded.getChannelData(c).subarray(0,frames),c);
 buffer=cut;return cut;
 }).catch(()=>{pending=null;return null});
 return pending;
}
function monitor(){
 const s=state(),allowed=s.open&&s.playing&&!s.finale&&!document.hidden&&document.querySelector('#sound')?.getAttribute('aria-pressed')!=='false'&&document.querySelector('#music-setting')?.checked!==false;
 if(!allowed){silence();return}
 ctx.resume().catch(()=>{});
 bus.gain.setTargetAtTime(s.speaking?VOICE_LEVEL:LEVEL,ctx.currentTime,.2);
 if(buffer&&!source){source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;source.loopStart=0;source.loopEnd=buffer.duration;source.connect(bus);source.start()}
}
function start(read){stop();state=read;const token=generation;
 try{ctx??=new(window.AudioContext||window.webkitAudioContext)();ctx.resume().catch(()=>{});if(!bus){bus=ctx.createGain();bus.connect(ctx.destination)}bus.gain.value=LEVEL;
 watch=setInterval(monitor,120);load().then(()=>{if(token===generation)monitor()});
 }catch{stop()}
}
document.addEventListener('visibilitychange',()=>{if(watch)monitor()});
window.FindBackgroundMusic={start,stop};
})();
