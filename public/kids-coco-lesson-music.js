(()=>{
let ctx,bus,timer,nodes=new Set(),step=0,ducked=false;
const allowed=()=>document.querySelector('#sound')?.getAttribute('aria-pressed')!=='false'&&document.querySelector('#music-setting')?.checked!==false&&!document.hidden;
function init(){ctx??=new(window.AudioContext||window.webkitAudioContext)();ctx.resume();if(!bus){bus=ctx.createGain();bus.gain.value=.6;bus.connect(ctx.destination)}}
function note(hz,at,length,volume){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.025);g.gain.exponentialRampToValueAtTime(.0001,at+length);o.connect(g);g.connect(bus);nodes.add(o);o.onended=()=>{nodes.delete(o);o.disconnect();g.disconnect()};o.start(at);o.stop(at+length+.02)}
function stop(){recordedGeneration++;clearInterval(recordedWatch);recordedWatch=null;quietRecording();clearInterval(timer);timer=null;for(const o of nodes)try{o.stop()}catch{}nodes.clear()}
function welcome(){stop();if(!allowed())return;try{init();[523.25,659.25,783.99,1046.5,783.99].forEach((f,i)=>note(f,ctx.currentTime+i*.19,.75,.075))}catch{}}
let recordedSource,recordedBuffer,recordedPending,recordedBus,recordedWatch,recordedGeneration=0;
function quietRecording(){if(recordedSource){try{recordedSource.stop()}catch{}recordedSource.disconnect();recordedSource=null}}
function monitorRecording(){if(!allowed()){quietRecording();return}ctx.resume().catch(()=>{});recordedBus.gain.setTargetAtTime(ducked?.025:.08,ctx.currentTime,.2);if(recordedBuffer&&!recordedSource){recordedSource=ctx.createBufferSource();recordedSource.buffer=recordedBuffer;recordedSource.loop=true;recordedSource.loopEnd=recordedBuffer.duration;recordedSource.connect(recordedBus);recordedSource.start()}}
function start(){stop();const token=recordedGeneration;try{init();recordedBus??=ctx.createGain();recordedBus.disconnect();recordedBus.connect(ctx.destination);recordedBus.gain.value=ducked?.025:.08;recordedWatch=setInterval(monitorRecording,120);if(!recordedPending)recordedPending=fetch('find-game-music.mp3').then(r=>{if(!r.ok)throw Error();return r.arrayBuffer()}).then(b=>ctx.decodeAudioData(b)).then(d=>{const frames=Math.min(d.length,Math.round(d.sampleRate*22));recordedBuffer=ctx.createBuffer(d.numberOfChannels,frames,d.sampleRate);for(let c=0;c<d.numberOfChannels;c++)recordedBuffer.copyToChannel(d.getChannelData(c).subarray(0,frames),c)}).catch(()=>{recordedPending=null});recordedPending.then(()=>{if(token===recordedGeneration)monitorRecording()})}catch{stop()}}
function duck(value){ducked=value;if(bus&&ctx)bus.gain.setTargetAtTime(value?.22:.6,ctx.currentTime,.15)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
window.CocoLessonMusic={welcome,start,stop,duck};
})();