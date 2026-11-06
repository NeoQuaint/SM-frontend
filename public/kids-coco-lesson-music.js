(()=>{
let ctx,bus,timer,nodes=new Set(),step=0,ducked=false;
const allowed=()=>document.querySelector('#sound')?.getAttribute('aria-pressed')!=='false'&&document.querySelector('#music-setting')?.checked!==false&&!document.hidden;
function init(){ctx??=new(window.AudioContext||window.webkitAudioContext)();ctx.resume();if(!bus){bus=ctx.createGain();bus.gain.value=.6;bus.connect(ctx.destination)}}
function note(hz,at,length,volume){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.025);g.gain.exponentialRampToValueAtTime(.0001,at+length);o.connect(g);g.connect(bus);nodes.add(o);o.onended=()=>{nodes.delete(o);o.disconnect();g.disconnect()};o.start(at);o.stop(at+length+.02)}
function stop(){clearInterval(timer);timer=null;for(const o of nodes)try{o.stop()}catch{}nodes.clear()}
function welcome(){stop();if(!allowed())return;try{init();[523.25,659.25,783.99,1046.5,783.99].forEach((f,i)=>note(f,ctx.currentTime+i*.19,.75,.075))}catch{}}
function start(){stop();if(!allowed())return;try{init();step=0;const tune=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];const tick=()=>{if(!allowed()){stop();return}const t=ctx.currentTime;note(tune[step%8],t,2,.022);if(step%4===0){note(step%8===0?130.81:146.83,t,4,.018);note(step%8===0?196:220,t,4,.009)}step++};tick();timer=setInterval(tick,1500)}catch{}}
function duck(value){ducked=value;if(bus&&ctx)bus.gain.setTargetAtTime(value?.22:.6,ctx.currentTime,.15)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
window.CocoLessonMusic={welcome,start,stop,duck};
})();