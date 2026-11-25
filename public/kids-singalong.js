(()=>{
const groups=[["family","Family","👩‍👧‍👦","#ffdbe6"],["animals","Animals","🐮 🐥","#ffe7aa"],["numbers","Numbers","1️⃣ 2️⃣ 3️⃣","#d9f0db"],["alphabet","Alphabet","🔤","#e5d9ff"],["colours","Colours","🌈","#d5efff"],["shapes","Shapes","<svg viewBox=\"0 0 180 100\" width=\"150\" height=\"90\" aria-hidden=\"true\"><circle cx=\"40\" cy=\"42\" r=\"29\" fill=\"#ff735b\"/><path d=\"M112 13L146 74H78Z\" fill=\"#52cd90\"/><rect x=\"49\" y=\"47\" width=\"44\" height=\"44\" rx=\"5\" fill=\"#559ff5\"/></svg>","#ffe2cb"],["actions","Buzz Bee","🐝 🎵","#ffe2cb"]];
groups.sort((a,b)=>['numbers','colours','shapes','family','alphabet','animals','actions'].indexOf(a[0])-['numbers','colours','shapes','family','alphabet','animals','actions'].indexOf(b[0]));
const room=document.createElement('dialog');room.id='sing-room';room.setAttribute('aria-label','Sing Along');document.body.append(room);
let group=null,audio=null,url=null,visit=0,saved=[],loaded=false,currentSession='song';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open('smartclass-singalong',1);r.onupgradeneeded=()=>r.result.createObjectStore('songs',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function read(){if(loaded)return;loaded=true;try{const d=await db();saved=await new Promise((res,rej)=>{const r=d.transaction('songs').objectStore('songs').getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});d.close()}catch{}}
async function save(song){const d=await db();try{await new Promise((res,rej)=>{const tx=d.transaction('songs','readwrite');tx.objectStore('songs').put(song);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)})}finally{d.close()}}
function stop(){if(audio){audio.pause();audio=null}if(url){URL.revokeObjectURL(url);url=null}room.classList.remove('sing-playing')}
function header(title){return '<header class="sing-header"><button data-sing-back aria-label="'+(group?'Back to song categories':'Back to playroom')+'">←</button><h2>'+title+'</h2><span aria-hidden="true">♫</span></header>'}
function library(){room.classList.remove('song-scenery');visit++;stop();group=null;room.innerHTML=header('Sing Along')+'<div class="sing-groups">'+groups.map(g=>'<button data-sing-group="'+g[0]+'" style="--song-colour:'+g[3]+'"><span class="sing-group-art" aria-hidden="true">'+g[2]+'</span><strong>'+g[1]+'</strong><span class="sing-note" aria-hidden="true">♪</span></button>').join('')+'</div>'}


const hugs=['coco','juppy','lily','suzy'];
function hugArt(i){return '<img class="song-hug" src="song-maya-'+hugs[i%4]+'-hug.webp" alt="Maya and '+hugs[i%4]+' hugging">'}
function watchSong(media,el){let timer;const clear=()=>{clearTimeout(timer);timer=null};media.addEventListener('ended',()=>{clear();if(feed?.el!==el)return;const active=feed;timer=setTimeout(()=>{if(feed===active&&el.open&&media.ended&&!document.hidden)stepSong(1)},5000)});media.addEventListener('play',clear);media.addEventListener('seeking',clear);el.addEventListener('close',clear,{once:true});}
window.SongFeedMedia={watch:watchSong,hug:hugArt};
function uniformControls(el){
 if(el.querySelector('.unified-song-controls'))return;
 const buttons=[...el.querySelectorAll('button')];
 const find=word=>buttons.find(b=>(b.getAttribute('aria-label')||'').toLowerCase().includes(word));
 const restart=find('restart')||find('replay'),play=find('pause')||find('play song')||buttons.find(b=>b.hasAttribute('data-as-play')),mute=find('mute')||find('sound'),seek=el.querySelector('input[type=range]');
 if(!restart||!play||!seek)return;
 const header=el.querySelector('header');if(mute&&header){header.lastElementChild?.matches('span[aria-hidden]')&&header.lastElementChild.remove();header.append(mute)}
 const footer=document.createElement('div');footer.className='unified-song-controls';const row=document.createElement('div');row.className='unified-song-buttons';play.classList.add('unified-song-play');row.append(restart,play);const spacer=document.createElement('span');spacer.textContent='♫';spacer.setAttribute('aria-hidden','true');row.append(spacer);footer.append(row,seek);el.append(footer);el.classList.add('uniform-song');
}

// One circular feed, using the original players and their recorded timing.
let feed=null,lastSwitch=0;
function playlist(){return [
 {id:'numbers',title:'Numbers'}, {id:'colours',title:'Mix the Colours',group:'colours'}, {id:'shapes',title:'Shapes Everywhere',group:'shapes'},
 {id:'family',title:'Family'}, {id:'abc',title:'Alphabet',group:'alphabet'}, {id:'animals',title:'Animals'},
 ...saved.map(s=>({id:s.id,title:s.title,group:s.group})),
 {id:'remix',title:'Buzz Bee',group:'actions'}
]}
function leaveFeed(){const previous=feed;feed=null;if(!previous)return;
 previous.el.classList.remove('sing-feed-active');previous.el.querySelector('.sing-feed-nav')?.remove();
 if(previous.el===room)stop();

 else {const api={animals:window.AnimalSingAlong,family:window.FamilySingAlong,numbers:window.NumbersSingAlong,shapes:window.ShapesSingAlong}[previous.id];api?.close()}
}
function openTrack(id){const track=playlist().find(t=>t.id===id);if(!track)return;
 const unit=id;if(window.SmartClassMembership?.checkSong(unit)===false)return;
 leaveFeed();stop();library();
 const api={animals:window.AnimalSingAlong,family:window.FamilySingAlong,numbers:window.NumbersSingAlong,shapes:window.ShapesSingAlong}[id];
 if(api){api.open();attachFeed(id,document.getElementById({animals:'animal-song',family:'family-song',numbers:'numbers-song',shapes:'shapes-song'}[id]))}

 else {group=groups.find(g=>g[0]===track.group);player(id)}
}
function stepSong(direction){if(!feed||performance.now()-lastSwitch<650)return;
 const list=playlist(),index=list.findIndex(t=>t.id===feed.id);lastSwitch=performance.now();
 openTrack(list[(index+direction+list.length)%list.length].id);
}
function attachFeed(id,el){if(!el?.open)return;feed={id,el};uniformControls(el);el.classList.add('sing-feed-active');
 el.querySelector('.sing-feed-nav')?.remove();const nav=document.createElement('nav');nav.className='sing-feed-nav';nav.setAttribute('aria-label','Change song');
 nav.innerHTML='<button type="button" data-feed-prev aria-label="Previous song">⌃</button><span>Swipe for songs</span><button type="button" data-feed-next aria-label="Next song">⌄</button>';el.append(nav);
 nav.querySelector('[data-feed-prev]').onclick=()=>stepSong(-1);nav.querySelector('[data-feed-next]').onclick=()=>stepSong(1);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)el.animate([{opacity:.65,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:230});
 if(el.dataset.feedBound)return;el.dataset.feedBound='true';let touch=null,wheel=0,wheelTime=0;
 const controls=target=>target.closest('button,input,select,textarea,a,nav');
 el.addEventListener('touchstart',e=>{touch=e.touches.length===1&&!controls(e.target)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
 el.addEventListener('touchmove',e=>{if(feed?.el===el&&touch&&Math.abs(e.touches[0].clientY-touch.y)>12)e.preventDefault()},{passive:false});
 el.addEventListener('touchend',e=>{if(feed?.el!==el||!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dy)>55&&Math.abs(dy)>Math.abs(dx)*1.25)stepSong(dy<0?1:-1)},{passive:true});
 el.addEventListener('touchcancel',()=>{touch=null},{passive:true});
 el.addEventListener('wheel',e=>{if(feed?.el!==el||controls(e.target)||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const now=performance.now();if(now-wheelTime>180)wheel=0;wheelTime=now;wheel+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);if(Math.abs(wheel)>65){stepSong(wheel>0?1:-1);wheel=0}},{passive:false});
 el.addEventListener('keydown',e=>{if(feed?.el!==el||controls(e.target))return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();stepSong(e.key==='ArrowDown'?1:-1)}});
 el.addEventListener('close',()=>{if(feed?.el===el){feed=null;el.classList.remove('sing-feed-active');el.querySelector('.sing-feed-nav')?.remove()}});
}

function songs(id){room.classList.remove('song-scenery');if(['numbers','family','animals','colours','shapes'].includes(id)){openTrack(id);return}visit++;stop();group=groups.find(g=>g[0]===id);if(!group)return library();const g=group,tracks=saved.filter(x=>x.group===id);
room.innerHTML=header(g[1])+'<section class="sing-category" style="--song-colour:'+g[3]+'"><div class="sing-category-art" aria-hidden="true">'+g[2]+'</div><div class="sing-track-list">'+(id==='actions'?'<button data-sing-track="remix"><span>▶</span> Buzz Bee</button>':'')+(id==='alphabet'?'<button data-sing-abc><span>♫</span> ABC melody & letter play</button>':'')+tracks.map(x=>'<button data-sing-track="'+x.id+'"><span>▶</span> '+esc(x.title)+'</button>').join('')+(!tracks.length&&!['actions','alphabet','animals'].includes(id)?'<div class="sing-empty"><span aria-hidden="true">🎶</span><p>A song is waiting to join us!</p><small>No song added yet.</small></div>':'')+'</div><details class="sing-grownups"><summary>Grown-ups: add a song</summary><p>Add your recording to '+g[1]+'. It stays in this browser on this device.</p><label class="sing-upload">Choose audio<input type="file" accept="audio/*,.mp3,.wav,.m4a,.ogg" id="sing-file"></label><p class="sing-save-status" role="status"></p></details></section>';
}
function player(id){if(window.SmartClassMembership?.startSong(id)===false)return;currentSession=id;const song=id==='abc'?{title:'ABC Sing-Along',src:'abc-sing-along.mp3'}:id==='colours'?{title:'Mix the Colours',src:'mix-the-colours.mp3'}:id==='remix'?{title:'Buzz Bee',src:'kids-remix.mp3'}:saved.find(x=>x.id===id);if(!song)return;stop();const g=group;room.innerHTML=header(g[1])+'<section class="sing-player" style="--song-colour:'+g[3]+'"><div class="sing-music-notes" aria-hidden="true">♪ ♫ ♪</div><div class="sing-dancer" aria-hidden="true">'+g[2]+'</div><h3>'+esc(song.title)+'</h3><div class="sing-controls"><button data-sing-restart aria-label="Restart song">↻</button><button data-sing-play aria-label="Pause song">Ⅱ</button><button data-sing-mute aria-label="Mute song">🔊</button></div><input class="sing-seek" type="range" min="0" max="100" value="0" aria-label="Song position"><p class="sing-play-status" role="status"></p></section>';
window.SongScenery?.set(room,'candy');
if(id==='colours'){
 room.querySelector('.sing-dancer').innerHTML='<div class="colour-song-pair"></div>';
 room.querySelector('.sing-dancer').classList.add('colour-song-art');
 room.querySelector('h3').classList.add('colour-song-lyric');
}
let abcLine=-1;
function showABC(){if(id!=='abc')return;const scenes=window.ABCSongScenes||[];if(!scenes.length)return;const duration=Number.isFinite(audio?.duration)?audio.duration:150;const n=Math.min(scenes.length-1,Math.floor((audio?.currentTime||0)/duration*scenes.length));if(n===abcLine)return;abcLine=n;const scene=scenes[n];room.querySelector('.sing-dancer').classList.add('abc-song-art');room.querySelector('.sing-dancer').innerHTML='<img class="abc-song-lily" src="lily-full-body.png" alt="Lily"><div class="abc-song-letters">'+scene.letters.split('').map((letter,i)=>'<b style="color:'+['#f94367','#298df2','#28b77d','#eaa916','#a96ae7'][i%5]+'">'+letter+'</b>').join('')+'</div><div class="abc-song-object" aria-hidden="true">'+scene.icon+'</div>';room.querySelector('h3').classList.add('colour-song-lyric');room.querySelector('h3').textContent=scene.text;}
showABC();
if(id==='remix'){room.querySelector('.sing-dancer').innerHTML=hugArt(0);room.querySelector('.sing-dancer').classList.add('sing-hug-art')}
let colourLine=-1;
const colourPairs=[['Red','Blue'],['Green','Yellow'],['Black','White'],['Pink','Orange'],['Brown','Purple'],null,null,null,null,['Red','Blue'],['Pink','Yellow'],['Green','Yellow'],['Black','White'],['Pink','Orange'],['Brown','Purple'],null,null,null,null];
const colourPaint={Red:'#fa3454',Blue:'#2685ff',Green:'#2cc57b',Yellow:'#ffdc38',Black:'#33364e',White:'#fffdf5',Pink:'#ff73bc',Orange:'#ff963b',Brown:'#a66c43',Purple:'#a36bf0'};
function showColourLine(){
 if(id!=='colours')return;
 const duration=Number.isFinite(audio?.duration)?audio.duration:70;
 const line=Math.min(colourPairs.length-1,Math.floor(((audio?.currentTime||0)<duration/colourPairs.length+1?0:(audio?.currentTime||0))/duration*colourPairs.length));
 if(line===colourLine)return;colourLine=line;
 const pair=colourPairs[line],mixing=!pair;
 room.querySelector('.colour-song-pair').innerHTML=(pair||Object.keys(colourPaint)).map((name,i)=>'<span class="colour-song-balloon" style="--paint:'+colourPaint[name]+';--delay:'+(-i*.3)+'s"><b style="color:'+(name==='Black'?'white':'#252541')+'">'+name+'</b></span>').join('');
 room.querySelector('.colour-song-art').classList.toggle('colour-song-mixing',mixing);
 room.querySelector('h3').textContent=pair?pair.join(' and ')+' are my friends':(line===8||line===18?'And we run, run, happy mix them!':'And we mix the colours, mix them!');
}
showColourLine();
url=song.blob?URL.createObjectURL(song.blob):null;audio=new Audio(url||song.src);
watchSong(audio,room);audio.volume=.8;audio.onplay=()=>{room.classList.add('sing-playing');const b=room.querySelector('[data-sing-play]');b.textContent='Ⅱ';b.setAttribute('aria-label','Pause song')};
audio.onpause=()=>{room.classList.remove('sing-playing');const b=room.querySelector('[data-sing-play]');if(b){b.textContent='▶';b.setAttribute('aria-label','Play song')}};
audio.ontimeupdate=()=>{if(id==='remix'){const art=room.querySelector('.sing-dancer'),pair=Math.floor(audio.currentTime/10)%4;if(art.dataset.hug!==String(pair)){art.dataset.hug=pair;art.innerHTML=hugArt(pair);art.classList.add('sing-hug-art')}}showABC();showColourLine();window.SongScenery?.set(room,['candy','town','beach','night'][Math.floor(audio.currentTime/16)%4]);const r=room.querySelector('.sing-seek');if(r&&Number.isFinite(audio.duration))r.value=audio.currentTime/audio.duration*100};
audio.onended=()=>{window.KidsProgress?.complete('sing','Sing Along '+currentSession);room.classList.remove('sing-playing');room.querySelector('.sing-play-status').textContent='Again? Tap play!';room.querySelector('[data-sing-play]').textContent='▶'};
audio.onerror=()=>{room.querySelector('.sing-play-status').textContent='This song could not play. Try another audio file.'};
play();
attachFeed(id,room);
}
function play(){if(window.SmartClassMembership?.begin('singalong',currentSession)===false)return;audio?.play().then(()=>window.SmartClassMembership?.songPlayed(currentSession)).catch(()=>{const s=room.querySelector('.sing-play-status');if(s)s.textContent='Tap play to start.'})}
room.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-sing-back')){if(room.querySelector('.sing-player')){leaveFeed();library();}else if(group)library();else room.close()}if(b.dataset.singGroup)songs(b.dataset.singGroup);if(b.dataset.singTrack)player(b.dataset.singTrack);if(b.hasAttribute('data-sing-abc')){openTrack('abc')}if(b.hasAttribute('data-sing-play')){if(audio.paused){if(audio.ended){if(window.SmartClassMembership?.startSong(currentSession)===false)return;audio.currentTime=0;}play()}else audio.pause()}if(b.hasAttribute('data-sing-restart')&&audio){if(window.SmartClassMembership?.startSong(currentSession)===false)return;audio.currentTime=0;play()}if(b.hasAttribute('data-sing-mute')&&audio){audio.muted=!audio.muted;b.textContent=audio.muted?'🔇':'🔊';b.setAttribute('aria-label',audio.muted?'Unmute song':'Mute song')}});
room.addEventListener('input',e=>{if(e.target.matches('.sing-seek')&&audio&&Number.isFinite(audio.duration))audio.currentTime=audio.duration*Number(e.target.value)/100});
room.addEventListener('change',async e=>{if(e.target.id!=='sing-file')return;const file=e.target.files[0],stamp=visit,currentGroup=group?.[0];if(!file||!currentGroup)return;const status=room.querySelector('.sing-save-status');if(file.size>30*1024*1024){status.textContent='Please choose audio smaller than 30 MB.';return}if(!file.type.startsWith('audio/')&&!/\.(mp3|wav|m4a|ogg)$/i.test(file.name)){status.textContent='Please choose an audio file.';return}const song={id:crypto.randomUUID(),group:currentGroup,title:file.name.replace(/\.[^.]+$/,''),blob:file};saved.push(song);let stored=true;try{await save(song)}catch{stored=false}if(visit===stamp&&room.open){songs(currentGroup);const s=room.querySelector('.sing-save-status');if(s)s.textContent=stored?'Song saved on this device.':'Ready for this visit. Browser storage is unavailable.'}});
window.addEventListener('smartclass:song-limit',()=>audio?.pause());room.addEventListener('close',()=>{visit++;stop();document.body.classList.remove('sing-open')});
document.addEventListener('visibilitychange',()=>{if(document.hidden)audio?.pause()});
window.KidsSingAlong={playAlphabet(){window.KidsBridge.stop();window.KidsSound.close();if(!room.open)room.showModal();document.body.classList.add('sing-open');openTrack('abc')},async open(){window.KidsBridge.stop();window.KidsSound.close();room.showModal();document.body.classList.add('sing-open');library();const stamp=visit;await read();if(room.open&&visit===stamp)library()}};
})();