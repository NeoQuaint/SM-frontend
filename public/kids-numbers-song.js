(()=>{
const START=11,VOCALS=21;
// Temporary spacing, to be adjusted with the user against the recording.
const cues=Array.from({length:20},(_,i)=>VOCALS+i*2);
const moves=['wiggle','squish','sway','bounce','squish','sway','wiggle','float','bounce','sway','float','squish','wiggle','sway','bounce','float','wiggle','squish','sway','bounce'];
const colours=['#fff0e9','#e6fbfb','#fff2dc','#fff6db','#f7eaff','#ecf9de','#eaf1ff','#f0edff','#fff8d8','#fff0ee'];
const room=document.createElement('dialog');room.id='numbers-song';room.setAttribute('aria-label','Numbers sing-along');document.body.append(room);
let audio=null,current=-2,muted=false,frame=0;
const $=s=>room.querySelector(s);
function show(i){if(current===i)return;current=i;room.style.setProperty('--ns-bg',colours[Math.max(i,0)%colours.length]);$('.ns-art').innerHTML=i<0?'<div class="ns-intro" aria-label="Music introduction">♫<span>♪</span></div>':'<img src="numbers-song/number-'+(i+1)+'.png" alt="Number '+(i+1)+'" style="--move:ns-'+moves[i]+'">';$('.ns-count').textContent=i<0?'Let’s count together':(i+1)+' / 20';if(i>=0&&i<19){const next=new Image();next.src='numbers-song/number-'+(i+2)+'.png'}}
function progress(){if(!audio)return;let i=-1;while(i+1<cues.length&&audio.currentTime>=cues[i+1])i++;show(i);const d=audio.duration;$('.ns-seek').disabled=!Number.isFinite(d)||d<=START;$('.ns-seek').value=Number.isFinite(d)&&d>START?Math.max(0,(audio.currentTime-START)/(d-START)*100):0}
function tick(){cancelAnimationFrame(frame);progress();if(audio&&!audio.paused)frame=requestAnimationFrame(tick)}
function stop(){cancelAnimationFrame(frame);if(audio){audio.pause();audio.onended=null;audio=null}room.classList.remove('ns-playing')}
function play(){if(window.SmartClassMembership?.begin('singalong','numbers')===false)return;audio?.play().catch(()=>{if(room.open)$('.ns-status').textContent='Tap play to start.'})}
function restart(){if(!audio)return;if(audio.error)audio.load();audio.currentTime=START;progress();play()}
function open(){if(window.SmartClassMembership?.begin('singalong','numbers')===false)return;stop();window.KidsBridge?.stop();window.KidsSound?.close();current=-2;
room.innerHTML='<header><button data-ns="back" aria-label="Back to song categories">←</button><strong>Numbers</strong><button data-ns="mute" aria-label="Mute song">🔊</button></header><main><div class="ns-art"></div><p class="ns-count"></p></main><footer><div class="ns-buttons"><button data-ns="restart" aria-label="Restart song">↻</button><button data-ns="play" aria-label="Play song">▶</button><span aria-hidden="true">♫</span></div><input class="ns-seek" type="range" min="0" max="100" step=".1" value="0" disabled aria-label="Song position"><p class="ns-status" role="status"></p></footer>';
room.showModal();show(-1);audio=new Audio('numbers-remix.mp3');audio.volume=.8;audio.muted=muted;
const mute=$('[data-ns="mute"]');mute.textContent=muted?'🔇':'🔊';mute.setAttribute('aria-label',muted?'Unmute song':'Mute song');
audio.onloadedmetadata=()=>{audio.currentTime=START;progress()};
audio.currentTime=START;
audio.onplay=()=>{room.classList.add('ns-playing');$('[data-ns="play"]').textContent='Ⅱ';$('[data-ns="play"]').setAttribute('aria-label','Pause song');$('.ns-status').textContent='';tick()};
audio.onpause=()=>{cancelAnimationFrame(frame);room.classList.remove('ns-playing');$('[data-ns="play"]').textContent='▶';$('[data-ns="play"]').setAttribute('aria-label','Play song')};
audio.ontimeupdate=progress;audio.onseeked=progress;
audio.onended=()=>{window.KidsProgress?.complete('sing','Numbers song');$('.ns-status').textContent='Again? Tap play!'};
audio.onerror=()=>{$('.ns-status').textContent='Could not load the song. Tap replay to try again.'};
play()}
room.addEventListener('click',e=>{const action=e.target.closest('[data-ns]')?.dataset.ns;if(action==='back'){room.close();return}if(!audio)return;if(action==='play'){if(audio.paused){if(audio.ended)restart();else play()}else audio.pause()}if(action==='restart')restart();if(action==='mute'){muted=!muted;audio.muted=muted;const b=$('[data-ns="mute"]');b.textContent=muted?'🔇':'🔊';b.setAttribute('aria-label',muted?'Unmute song':'Mute song')}});
room.addEventListener('input',e=>{if(e.target.matches('.ns-seek')&&audio&&Number.isFinite(audio.duration)&&audio.duration>START){audio.currentTime=START+(audio.duration-START)*Number(e.target.value)/100;progress()}});
room.addEventListener('close',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)audio?.pause()});
window.NumbersSingAlong={open};
})();