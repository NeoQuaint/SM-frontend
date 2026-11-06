(()=>{
let ctx,bus,beat,watch,nodes=new Set(),step=0,active=false,state=()=>({});
function note(f,t,d,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.035);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);nodes.add(o);o.onended=()=>{nodes.delete(o);o.disconnect();g.disconnect()};o.start(t);o.stop(t+d+.05)}
function silence(){for(const o of nodes)try{o.stop()}catch{}nodes.clear()}
function stop(){clearInterval(beat);clearInterval(watch);beat=watch=null;active=false;silence()}
function start(read){stop();state=read;try{ctx??=new(window.AudioContext||window.webkitAudioContext)();ctx.resume();bus??=ctx.createGain();bus.disconnect();bus.connect(ctx.destination);bus.gain.value=.5;step=0;const allowed=()=>{const s=state();return s.open&&!s.finale&&!document.hidden&&document.querySelector('#sound')?.getAttribute('aria-pressed')!=='false'&&document.querySelector('#music-setting')?.checked!==false};
const melody=[523.25,659.25,783.99,659.25,587.33,659.25,523.25,0,440,523.25,659.25,523.25,392,493.88,587.33,0];
function monitor(){const ok=allowed();if(!ok&&active)silence();active=ok;if(ok){ctx.resume();const s=state();bus.gain.setTargetAtTime(s.speaking?.19:.55,ctx.currentTime,.3)}}
function playBeat(){monitor();if(!active)return;const t=ctx.currentTime,f=melody[step%melody.length];if(f)note(f,t,2.4,.065);if(step%4===0){const chord=[[130.81,164.81,196],[146.83,174.61,220],[110,130.81,164.81],[98,123.47,146.83]][Math.floor(step/4)%4];chord.forEach(hz=>note(hz,t,6,.026))}step++}
playBeat();beat=setInterval(playBeat,1800);watch=setInterval(monitor,180)}catch{stop()}}
window.FindBackgroundMusic={start,stop};
})();