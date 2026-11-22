(()=>{
const songData=window.ANIMAL_RECORDINGS['animal-friends'],scenes=window.ANIMAL_LYRICS[0].pages;
const animals=[...new Set(scenes.flatMap(s=>s.animals))];
const room=document.createElement('dialog');room.id='animal-song';room.setAttribute('aria-label','Animals sing-along');document.body.append(room);
let audio=null,stage='song',current=-1,frame=0,muted=false;
const $=s=>room.querySelector(s);
function animal(n){return '<img class="as-creature as-'+n+'" src="emoji-animals/'+n+'.webp" alt="'+n+'" draggable="false">'}
function stop(){cancelAnimationFrame(frame);if(audio){audio.pause();audio.onended=null;audio.onplay=null;audio.onpause=null;audio.onerror=null;audio.removeAttribute('src');audio.load();audio=null}room.classList.remove('as-playing')}
function play(){audio?.play().then(()=>window.SmartClassMembership?.songPlayed('animals')).catch(()=>{$('[data-as-play]').textContent='▶'})}
function bind(){audio.muted=muted;audio.volume=.8;audio.onplay=()=>{room.classList.add('as-playing');$('[data-as-play]').textContent='Ⅱ';tick()};audio.onpause=()=>{room.classList.remove('as-playing');$('[data-as-play]').textContent='▶';cancelAnimationFrame(frame)};audio.onerror=()=>{$('.as-caption').textContent='Tap replay to try again.'}}
function startSong(replay=false){if(replay&&window.SmartClassMembership?.startSong('animals')===false)return;if(window.SmartClassMembership?.begin('singalong','animals')===false)return;song()}
function showAnimal(idx){
 const cue=scenes[idx];current=idx;window.SongScenery?.set(room,cue.theme);
 const art=$('.as-art'),key=cue.animals.join(',');
 if(art.dataset.animals!==key){art.dataset.animals=key;art.classList.toggle('as-ensemble',cue.animals.length>1);art.innerHTML=cue.animals.map((n,i)=>'<div class="as-friend" style="--friend:'+i+'">'+animal(n)+'</div>').join('')}
 $('.as-caption').innerHTML=cue.text.split(' ').map((w,i)=>'<span style="--word:'+i+'">'+w+'</span>').join(' ');
}
function song(){stop();stage='song';showAnimal(0);audio=new Audio(songData.src);bind();audio.onended=()=>{window.KidsProgress?.complete('sing','Animal Friends');stage='done';$('.as-caption').textContent='Wonderful singing!';$('.as-art').classList.remove('as-ensemble');delete $('.as-art').dataset.animals;$('.as-art').innerHTML='<img src="maya-celebrate.png" alt="Maya celebrating">';$('.as-seek').value=100;$('[data-as-play]').textContent='↻';room.classList.remove('as-playing');window.dispatchEvent(new Event('smartclass:animal-song-ended'))};play()}
function tick(force=false){cancelAnimationFrame(frame);if(!audio||(audio.paused&&!force))return;if(stage==='song'&&Number.isFinite(audio.duration)&&audio.duration>0){
 const elapsed=audio.currentTime,cues=songData.scenes;
 const idx=Math.max(0,cues.findLastIndex(c=>elapsed>=c.start));
 if(idx!==current)showAnimal(idx);
 const cue=cues[idx],position=Math.max(0,Math.min(1,(elapsed-cue.start)/((cue.highlightEnd||cue.end)-cue.start)));
 const words=$('.as-caption').querySelectorAll('span'),word=Math.min(words.length-1,Math.floor(position*words.length));
 words.forEach((el,i)=>el.classList.toggle('as-word-active',i===word));$('.as-seek').value=elapsed/audio.duration*100;
 }if(!audio.paused)frame=requestAnimationFrame(()=>tick())}
function open(){if(window.SmartClassMembership?.startSong('animals')===false)return;animals.forEach(n=>{const img=new Image();img.src='emoji-animals/'+n+'.webp'});window.KidsBridge?.stop();window.KidsSound?.close();room.innerHTML='<header><button data-as-back aria-label="Back to songs">←</button><strong>Animal Friends</strong><button data-as-mute aria-label="Toggle song sound">🔊</button></header><main><div class="as-art"></div><div class="as-caption" aria-live="off"></div></main><footer><button data-as-replay aria-label="Replay song">↻</button><button data-as-play aria-label="Play or pause">Ⅱ</button><input class="as-seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Song position"></footer>';room.showModal();startSong()}
room.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-as-back'))room.close();if(b.hasAttribute('data-as-replay'))startSong(true);if(b.hasAttribute('data-as-play')){if(stage==='done')startSong(true);else if(audio?.paused)play();else audio?.pause()}if(b.hasAttribute('data-as-mute')){muted=!muted;if(audio)audio.muted=muted;b.textContent=muted?'🔇':'🔊'}});
room.addEventListener('input',e=>{if(e.target.matches('.as-seek')&&stage==='song'&&Number.isFinite(audio?.duration)){audio.currentTime=audio.duration*Number(e.target.value)/100;current=-1;tick(true)}});
window.addEventListener('smartclass:song-limit',()=>audio?.pause());room.addEventListener('close',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)audio?.pause()});document.addEventListener('click',e=>{if(e.target.closest('[data-animal-song]'))open()});
window.addEventListener('pagehide',()=>audio?.pause());
window.AnimalSingAlong={open,close(){stop();room.close()}};
})();