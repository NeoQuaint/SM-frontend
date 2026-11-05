(()=>{
const animalLineSeconds=3.20;
const verse=['chicken','cow','dog','frog','cat','elephant','lion','cheetah','frog'],lines=[...verse,...verse];
const room=document.createElement('dialog');room.id='animal-song';room.setAttribute('aria-label','Animals sing-along');document.body.append(room);
let audio=null,stage='intro',current=-1,frame=0,muted=false;
const $=s=>room.querySelector(s);
function animal(n){return '<img class="as-creature as-'+n+'" src="emoji-animals/'+n+'.webp" alt="'+n+'" draggable="false">'}
function stop(){cancelAnimationFrame(frame);if(audio){audio.pause();audio.onended=null;audio=null}room.classList.remove('as-playing')}
function play(){audio?.play().catch(()=>{$('[data-as-play]').textContent='▶'})}
function bind(){audio.muted=muted;audio.volume=.8;audio.onplay=()=>{room.classList.add('as-playing');$('[data-as-play]').textContent='Ⅱ';tick()};audio.onpause=()=>{room.classList.remove('as-playing');$('[data-as-play]').textContent='▶';cancelAnimationFrame(frame)};audio.onerror=()=>{$('.as-caption').textContent='Tap replay to try again.'}}
function intro(){stop();stage='intro';current=-1;$('.as-art').innerHTML='<img src="maya-celebrate.png" alt="Maya welcomes you">';$('.as-caption').textContent='Hey there, let’s sing together!';audio=new Audio('voice/sing-animals-intro.mp3');bind();audio.onended=song;play()}
function showAnimal(idx){const n=lines[idx];current=idx;$('.as-art').innerHTML=animal(n);$('.as-caption').innerHTML=('This is '+(n==='elephant'?'an ':'a ')+n).split(' ').map((w,i)=>'<span style="--word:'+i+'">'+w+'</span>').join(' ');$('.as-round').textContent=(idx<9?'1':'2')+' / 2'}
function song(){stop();stage='song';showAnimal(0);audio=new Audio('animals-remix.mp3');bind();audio.onended=()=>{window.KidsProgress?.explore('sing','Animal song reached the end');stage='done';$('.as-caption').textContent='Wonderful singing!';$('.as-art').innerHTML='<img src="maya-celebrate.png" alt="Maya celebrating">';$('[data-as-play]').textContent='↻';room.classList.remove('as-playing')};play()}
function tick(force=false){cancelAnimationFrame(frame);if(!audio||(audio.paused&&!force))return;if(stage==='song'&&Number.isFinite(audio.duration)&&audio.duration>0){
 // Start with the chicken immediately; keep the 3.20-second animal cadence.
 const elapsed=audio.currentTime;
 const position=Math.min(lines.length-.001,elapsed/animalLineSeconds),idx=Math.floor(position);
 if(idx!==current)showAnimal(idx);
 const words=$('.as-caption').querySelectorAll('span'),word=Math.min(words.length-1,Math.floor((position-idx)*words.length));words.forEach((el,i)=>el.classList.toggle('as-word-active',i===word));$('.as-seek').value=audio.currentTime/audio.duration*100;
 }if(!audio.paused)frame=requestAnimationFrame(()=>tick())}
function open(){[...new Set(lines)].forEach(n=>{const img=new Image();img.src='emoji-animals/'+n+'.webp'});window.KidsBridge?.stop();window.KidsSound?.close();room.innerHTML='<header><button data-as-back aria-label="Back to songs">←</button><strong>Animals <small class="as-round"></small></strong><button data-as-mute aria-label="Toggle song sound">🔊</button></header><main><div class="as-art"></div><div class="as-caption" aria-live="off"></div></main><footer><button data-as-replay aria-label="Replay introduction and song">↻</button><button data-as-play aria-label="Play or pause">Ⅱ</button><input class="as-seek" type="range" min="0" max="100" value="0" aria-label="Song position"></footer>';room.showModal();intro()}
room.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-as-back'))room.close();if(b.hasAttribute('data-as-replay'))intro();if(b.hasAttribute('data-as-play')){if(stage==='done')intro();else if(audio?.paused)play();else audio?.pause()}if(b.hasAttribute('data-as-mute')){muted=!muted;if(audio)audio.muted=muted;b.textContent=muted?'🔇':'🔊'}});
room.addEventListener('input',e=>{if(e.target.matches('.as-seek')&&stage==='song'&&Number.isFinite(audio?.duration)){audio.currentTime=audio.duration*Number(e.target.value)/100;current=-1;tick(true)}});
room.addEventListener('close',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)audio?.pause()});document.addEventListener('click',e=>{if(e.target.closest('[data-animal-song]'))open()});
window.AnimalSingAlong={open};
})();