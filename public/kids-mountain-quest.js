
(()=>{
'use strict';
const $=s=>document.querySelector(s),KEY='smartclass-mountain-quest-v1',P=()=>window.KidsProgress;
let stops=['The sunny meadow','The whispering forest','The mountain of little wonders'];
const mountainTasks=[
['cat','Who says meow? Find the friend who can show us the trail.',['cat','cow','duck'],'Listen for meow. Look for whiskers.','The cat joins us. Our journey has begun!','Animal sounds','cat'],
['cow','Listen! Who is calling from the meadow?',['duck','cow','cat'],'Moo! Look for the cow.','The cow shows us the way to the pond.','Animal sounds','cow'],
['duck','Who says quack and swims on the pond?',['cat','duck','cow'],'Look for the little duck with a wide bill.','The duck paddles over. We can follow the pond path.','Animal sounds','duck'],
['apple','Let’s pack a crunchy red fruit for our picnic.',['apple','grapes','banana'],'It is round and red, with a leaf.','An apple for our picnic basket!','Fruit clues'],
['grapes','Which fruit grows in a bunch of little round berries?',['banana','apple','grapes'],'Look for the bunch of purple grapes.','Grapes packed! Our meadow friends wave goodbye.','Fruit clues'],
['umbrella','Soft rain is falling. What can keep Maya dry?',['book','umbrella','cup'],'It opens above your head and has a curved handle.','Up goes the umbrella! Let’s follow the forest path.','Object uses'],
['key','There is a little gate ahead. What fits in its lock?',['spoon','key','flower'],'Look for the small golden key.','Click! The gate is unlocked.','Object uses'],
['door','The gate is open. Find the door of the forest keeper’s cottage.',['tree','door','lamp'],'Look for the tall shape with a handle.','The door opens. A warm place to rest!','Object recognition'],
['book','The forest keeper has a story to share. What can we read?',['cup','book','shoe'],'Look for the book with pages.','A book for our picnic. Thank you, forest keeper!','Object uses'],
['tree','What has a trunk, branches and leaves?',['flower','cloud','tree'],'Look for the tall green tree.','The tree marks the trail. The mountain is close now!','Nature clues'],
['circle','The trail sign has a round shape with no corners. Find its match.',['triangle','circle','square'],'A circle goes round and round.','The circle sign points us towards the little bridge.','Shape matching'],
['triangle','Find the shape with three straight sides, like a mountain peak.',['square','circle','triangle'],'Count three sides. That is a triangle.','The triangle sign shows where to cross.','Shape matching'],
['three','We need three stepping stones to cross the stream. Find three.',['two','three','four'],'Touch and count: one, two, three.','Three stepping stones! Our path across is ready.','Counting groups'],
['cup','We reached the picnic spot! What can Juppy drink water from?',['spoon','cup','book'],'Find the cup with a handle.','A cup for Juppy. He is so happy to see us!','Object uses'],
['flower','One last discovery. What has petals and grows beside our picnic?',['tree','flower','cloud'],'Look for the colourful flower. We can enjoy it where it grows.','You found the flower! We made it to Juppy together.','Nature clues']
];
let state={step:0,solved:false},screen='map',voice=null,clip=null,epoch=0,lastFocus=null;
try{const v=JSON.parse(localStorage.getItem(KEY));if(v&&Number.isInteger(v.step)&&v.step>=0&&v.step<=15)state={step:v.step,solved:!!v.solved}}catch{}

const WORLD_KEY='smartclass-find-worlds-v1',worlds=window.FIND_WORLDS;
let journal={world:0,visits:[0,0,0,0],states:{},camp:[],observations:{},mode:1},helped=false;
try{const j=JSON.parse(localStorage.getItem(WORLD_KEY));if(j&&Number.isInteger(j.world)&&j.world>=0&&j.world<4&&Array.isArray(j.visits)&&j.visits.length===4&&j.states&&Array.isArray(j.camp))journal={...journal,...j}}catch{}
journal.camp=journal.camp.filter(n=>Number.isInteger(n)&&n>=0&&n<4);
let world=journal.world,tasks=[];
if(world===0&&!journal.states[0]){journal.states[0]={...state};if(state.step===15&&!journal.camp.includes(0))journal.camp.push(0)}
if(journal.states[world]&&Number.isInteger(journal.states[world].step)&&journal.states[world].step>=0&&journal.states[world].step<=15)state={...journal.states[world]};
else state={step:0,solved:false};
function prepareTasks(){
stops=worlds[world].stops;tasks=(world?worlds[world].tasks:mountainTasks).map(t=>JSON.parse(JSON.stringify(t)));
const visit=journal.visits[world]||0;
if(visit%2&&world===0){['dog','sheep','pig'].forEach((n,i)=>{tasks[i]=[n,'Find the friend who says '+['woof','baa','oink'][i]+'.',['dog','sheep','pig'],'Listen for '+['woof','baa','oink'][i]+'.','Our '+n+' friend joins the journey.','Animal sounds',n,'Which friend can help us follow the trail? Listen carefully.']})}
if(visit%2&&world>0){tasks=tasks.map(t=>t[0]==='apple'?['banana','I am a curved yellow fruit.',['banana','apple','grapes'],'Find the yellow curved fruit.','A banana snack for our friends.','Fruit clues',null,'We brought a yellow fruit for our snack. Which one is it?']:t)}
tasks=tasks.map(t=>{const original=t[1];t[1]=journal.mode===0?'Find '+({two:'two stones',three:'three stones',four:'four counters',watering:'the watering can',seed:'the seed',firefly:'the firefly'}[t[0]]||'the '+t[0])+'.':journal.mode===2?(t[7]||original):original;return t});
}
prepareTasks();

const room=document.createElement('dialog');room.id='mountain-quest';room.setAttribute('aria-label','Maya’s discovery world');document.body.append(room);
function save(){journal.world=world;journal.states[world]={...state};try{localStorage.setItem(WORLD_KEY,JSON.stringify(journal));if(world===0)localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function stop(){epoch++;if(clip){clip.pause();clip=null}KidsVoice?.cancel();voice=null}
function say(text,animal){stop();if($('#sound')?.getAttribute('aria-pressed')==='false'||document.hidden)return;const id=epoch;
const finish=()=>{if(id!==epoch||!room.open||!animal)return;clip=new Audio('animal-sounds/'+animal+'.mp3');clip.play().catch(()=>{})};
const src=window.KOKORO_CLIPS?.[text];if(src){clip=new Audio(src);clip.onended=finish;clip.onerror=()=>fallback();clip.play().catch(fallback)}else fallback();
function fallback(){if(id!==epoch||!window.KidsVoice)return;voice=new KidsVoice.Utterance(text);voice.lang='en-GB';voice.rate=.82;voice.onend=finish;window.KidsVoice.speak(voice)}}
function art(n){const extra=window.FindExtraArt(n);if(extra)return extra;
if(['cat','cow','duck','dog','sheep','pig'].includes(n))return window.KidsBridge.animalArt(n);
if(['umbrella','key','door','book','tree','cup','spoon','flower','cloud','shoe','lamp'].includes(n))return window.ObjectsPlayhouseArt.svg(n);
const svg=b=>'<svg viewBox="0 0 160 160" aria-hidden="true">'+b+'</svg>';
if(n==='apple')return svg('<path d="M80 45q-5-25 13-33" fill="none" stroke="#806447" stroke-width="7"/><path d="M88 29q5-24 31-18-8 26-31 18" fill="#86ad69"/><path d="M80 48C14 17 7 102 44 136q19 18 36 3 21 15 42-8 40-52 5-80-20-17-47-3" fill="#e7817e"/><path d="M45 65q-13 16-8 34" stroke="#ffd4b5" fill="none" stroke-width="9" stroke-linecap="round"/>');
if(n==='banana')return svg('<path d="M31 31q5 87 101 76-27 55-83 22Q12 106 25 35" fill="#efd07e" stroke="#caa45c" stroke-width="5"/><path d="M31 31 27 17" stroke="#806447" stroke-width="9"/>');
if(n==='grapes')return svg('<path d="M80 31 87 10" stroke="#81684e" stroke-width="7"/>'+[[57,48],[91,48],[39,77],[75,78],[110,78],[57,109],[91,109],[75,135]].map(([x,y])=>'<circle cx="'+x+'" cy="'+y+'" r="20" fill="#aa91c7" stroke="#8d75ab" stroke-width="3"/>').join(''));
if(n==='circle')return svg('<circle cx="80" cy="80" r="55" fill="#e8b16e" stroke="#c28c52" stroke-width="5"/>');
if(n==='triangle')return svg('<path d="M80 20 145 137H15Z" fill="#a99dce" stroke="#857aaf" stroke-width="5" stroke-linejoin="round"/>');
if(n==='square')return svg('<rect x="28" y="28" width="104" height="104" rx="9" fill="#83b5b5" stroke="#629595" stroke-width="5"/>');
const count={two:2,three:3,four:4}[n];return svg(Array.from({length:count||0},(_,i)=>'<ellipse cx="'+(count===3?[35,80,125][i]:i%2?110:50)+'" cy="'+(count===3?85:i<2?55:112)+'" rx="23" ry="18" fill="#a8b4bd" stroke="#7d8e99" stroke-width="3"/>').join(''));
}
function scene(stage,solved=false){if(world)return worldScene(stage,solved);
const progress=Math.min(15,state.step+(solved?1:0)),forest=stage===1,mountain=stage===2;
return '<svg class="mq-landscape" viewBox="0 0 900 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="mq-sky" x2="0" y2="1"><stop stop-color="'+(forest?'#9be8ff':mountain?'#8edcff':'#8ee9ff')+'"/><stop offset="1" stop-color="#e4fbff"/></linearGradient></defs><rect width="900" height="650" fill="url(#mq-sky)"/><circle cx="735" cy="105" r="44" fill="#ffcf32"/><g class="mq-cloud" fill="#fffaf0"><ellipse cx="170" cy="100" rx="80" ry="24"/><circle cx="148" cy="83" r="29"/><circle cx="187" cy="75" r="38"/></g><path d="M360 400 590 95 820 400" fill="#9b6fea"/><path d="m518 191 72-96 82 109-50-25-31 22-29-33Z" fill="#fff6e9"/><path d="m630 400 160-209 150 209" fill="#b18aff"/><path d="M0 370Q200 230 480 390T900 350V650H0Z" fill="#91df42"/><path d="M0 480Q280 320 550 470T900 440V650H0Z" fill="#48c451"/><path d="M440 680Q650 490 470 430T575 310" fill="none" stroke="#e7cfac" stroke-width="75" stroke-linecap="round"/>'+
(forest?'<g fill="#149f62"><path d="M-60 480 80 60 225 480Z"/><path d="m110 430 120-370 120 370Z"/><path d="m650 480 120-420 145 420Z"/></g><g stroke="#7e7960" stroke-width="24"><path d="M80 470V220M230 450V210M775 480V200"/></g><path d="M342 350v-95h122v95" fill="#e4c7a1"/><path d="m319 262 85-74 84 74" fill="#ba8f7d"/><rect x="390" y="288" width="39" height="62" rx="5" fill="#826c61"/>'+(progress>=8?'<path d="m390 288 14 9v48l-14 5" fill="#ead39c"/>':''):'')+
(mountain?'<path d="M0 470Q230 400 400 490T900 470" fill="none" stroke="#35c8f2" stroke-width="42"/>'+Array.from({length:progress>=13?3:0},(_,i)=>'<ellipse cx="'+(410+i*45)+'" cy="'+(476+i*7)+'" rx="25" ry="13" fill="#e4ddc9" stroke="#89949a" stroke-width="3"/>').join(''):'')+
'<path class="mq-trail-glow" d="M440 610Q610 490 470 430T575 310" pathLength="15" fill="none" stroke="#fff2bd" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+progress+' 15"/><g fill="#edc995">'+[80,260,695,830].map((x,i)=>'<circle cx="'+x+'" cy="'+(530+i%2*36)+'" r="7"/>').join('')+'</g></svg>';
}
function rewards(){if(world)return '<div class="mq-travel-basket" aria-label="Discoveries collected">'+tasks.slice(Math.floor(state.step/5)*5,state.step+(state.solved?1:0)).map(t=>'<span>'+art(t[0])+'</span>').join('')+'</div>';const n=state.step+(state.solved?1:0);return '<div class="mq-travel-basket" aria-label="Friends and picnic things collected">'+['cat','cow','duck','apple','grapes'].slice(0,Math.min(5,n)).map(a=>'<span>'+art(a)+'</span>').join('')+'</div>'+(n>=6&&state.step<10?'<div class="mq-open-umbrella" aria-hidden="true">'+art('umbrella')+'</div>':'')}
const hosts=[{name:'Juppy',image:'juppy-guide.png'},{name:'Coco',image:'coco-counting.webp'},{name:'Lily',image:'peek-blue.png'},{name:'Suzy',image:'peek-orange.png'}];
function friends(){return '<div class="mq-friend-pair"><img src="monster.png" alt="Maya"><img src="'+hosts[world].image+'" alt="'+hosts[world].name+'"></div>'}
function header(){return '<header class="mq-header"><button data-mq="close" aria-label="Save and return to playroom">←</button><span>Maya’s discovery world</span><button data-mq="map" aria-label="Journey map">⌁ Map</button></header>'}
function open(){lastFocus=document.activeElement;window.KidsBridge.stop();window.KidsLearning?.cancel();window.KidsSound.close();document.body.classList.add('mq-open');if(!room.open)room.showModal();map()}
function close(){cancelTravel();stop();save();room.close();document.body.classList.remove('mq-open');lastFocus?.focus()}
function mountainMap(){cancelTravel();stop();screen='map';room.innerHTML=header()+'<main class="mq-map"><div class="mq-map-art">'+scene(2)+'<img src="maya-pointing-summit.png" alt="Maya points up the trail toward Juppy at the mountain summit" class="mq-map-maya"><img src="juppy-guide.png" alt="Juppy is waiting at the summit" class="mq-map-juppy"></div><section class="mq-map-copy"><small>A LITTLE HELP. A BIG ADVENTURE.</small><h1>The mountain of<br>little wonders.</h1><p>Juppy is waiting for a picnic. Help Maya follow the trail, find useful things and reach her friend.</p><div class="mq-stops">'+stops.map((s,i)=>'<div class="'+(state.step>=5*(i+1)?'done':Math.floor(state.step/5)===i?'current':'')+'"><span>'+(state.step>=5*(i+1)?'✓':i+1)+'</span><b>'+s+'</b><small>5 discoveries</small></div>').join('')+'</div><button class="mq-primary" data-mq="'+(state.step===15?'finish':'start')+'">'+(state.step===15?'Our mountain picnic →':state.step||state.solved?'Continue our adventure →':'Let’s go, Maya! →')+'</button><p class="mq-small">'+Math.min(15,state.step+(state.solved?1:0))+' of 15 discoveries · Your place is saved on this device.</p></section></main>'}
function render(){stop();screen='play';const task=tasks[state.step],stage=Math.floor(state.step/5),order=[...task[2]].sort(()=>Math.random()-.5);
room.innerHTML=header()+'<main class="mq-play"><div class="mq-place"><span>'+stops[stage]+'</span><b>'+Math.min(15,state.step+(state.solved?1:0))+' / 15</b></div><section class="mq-scene">'+scene(stage,state.solved)+rewards()+'<div class="mq-story-maya"><img src="peek-purple.png" alt="Maya explores with you"></div>'+(state.step>=13?'<img class="mq-waiting-juppy" src="'+hosts[world].image+'" alt="'+hosts[world].name+' welcomes you">':'')+'<div class="mq-scene-sign">'+(world?['','RIVERSIDE','LAKE HOUSE','GARDEN'][world]:(stage===0?'MEADOW':stage===1?'FOREST':'SUMMIT'))+' ↑</div><div class="mq-choices" role="group" aria-label="Find the answer">'+order.map(n=>'<button data-mq-answer="'+n+'" aria-label="'+({two:'two stones',three:'three stones',four:'four stones'}[n]||n)+'" '+(state.solved?'disabled':'')+' class="'+(state.solved&&n===task[0]?'mq-correct':'')+'">'+art(n)+'<span>'+({two:'2 stones',three:'3 stones',four:'4 stones'}[n]||n)+'</span></button>').join('')+'</div><div class="mq-satchel" aria-label="Discoveries at this stop">'+Array.from({length:5},(_,i)=>'<span class="'+(i<state.step%5+(state.solved?1:0)?'earned':'')+'">✦</span>').join('')+'</div></section><section class="mq-prompt"><div><small>'+ (state.solved?'YOU MADE A DIFFERENCE':'MAYA NEEDS YOUR HELP')+'</small><h2>'+ (state.solved?task[4]:task[1])+'</h2><p class="mq-feedback" role="status"></p></div><div class="mq-tools"><button data-mq="listen" aria-label="Listen again">🔊</button>'+(state.solved?'<button class="mq-primary" data-mq="next">'+(state.step%5===4?'We made it! →':'Follow the trail →')+'</button>':'<button data-mq="clue">A little clue ✨</button>')+'</div></section></main>';room.scrollTop=0;room.querySelector('.mq-scene')?.style.setProperty('--mq-view',((state.step%5)-2)*2+'%')}
function answer(n){if(screen!=='play'||state.solved)return;const t=tasks[state.step];P()?.attempt('find',t[5],t[0]==='three'?'Three stepping stones':t[0],n===t[0]);if(n!==t[0]){helped=true;state.helped=true;save();room.querySelector('.mq-feedback').textContent='Let’s look again. '+t[3];say('Let’s look again. '+t[3]);return}const previous=journal.observations[t[0]];const supported=!!(helped||state.helped);if(previous?.supported&&!supported)P()?.explore('find',t[0]+' — found without a clue after needing help last time');journal.observations[t[0]]={supported,at:Date.now()};state.solved=true;save();P()?.explore('find',t[0]);render();say(t[4]);}
function advance(){state.step++;state.solved=false;state.helped=false;helped=false;save();if(state.step===15){P()?.complete('find',worlds[world].title+' · 15 discoveries');if(!journal.camp.includes(world))journal.camp.push(world);save();finish()}else if(state.step%5===0)checkpoint();else{render();say(tasks[state.step][1],tasks[state.step][6])}}
function mountainCheckpoint(){stop();screen='checkpoint';const stage=state.step/5-1;room.innerHTML=header()+'<main class="mq-checkpoint">'+scene(stage,true)+'<section><img src="maya-celebrate.png" alt="Maya celebrates"><small>FIVE LITTLE DISCOVERIES!</small><h1>'+ (stage===0?'Picnic basket packed.':'Through the forest!')+'</h1><p>'+ (stage===0?'Our meadow friends helped us find the trail. Next, the whispering forest.':'The forest keeper waves goodbye. Let’s follow the signs up the mountain.')+'</p><button class="mq-primary" data-mq="start">Keep exploring →</button><button data-mq="close">Take a little break</button><small>Your place is saved. Come back when you’re ready.</small></section></main>';say(stage===0?'Five discoveries! Our basket is packed. Ready for the forest?':'Five more discoveries! The mountain is waiting. We can take a break or keep exploring.')}
function mountainFinish(){stop();screen='finish';room.innerHTML=header()+'<main class="mq-checkpoint mq-finish">'+scene(2,true)+'<section><div class="mq-hug-finale"><img src="maya-juppy-hug.png" alt="Maya and Juppy hugging happily"><span aria-hidden="true">♡</span></div><small>15 DISCOVERIES. ONE LOVELY JOURNEY.</small><h1>We made it together!</h1><p>You listened, followed clues and found the way. Time for a mountain picnic with Juppy.</p><div class="mq-picnic">'+['apple','grapes','book','cup'].map(n=>art(n)).join('')+'</div><button class="mq-primary" data-mq="restart">Another adventure? ↻</button><button data-mq="close">Back to the playroom</button></section></main>';say('We made it to the mountain! Fifteen discoveries. Thank you for helping Maya. Let’s enjoy our picnic with Juppy.')}
room.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.world!==undefined){chooseWorld(Number(b.dataset.world));return}if(b.dataset.questMode!==undefined){journal.mode=Number(b.dataset.questMode);prepareTasks();save();map();return}if(b.dataset.campItem){say(b.dataset.campItem);return}if(b.dataset.mqAnswer){answer(b.dataset.mqAnswer);return}switch(b.dataset.mq){case'close':close();break;case'map':map();break;case'start':if(state.step<15){travel('walk',()=>{render();say(state.solved?tasks[state.step][4]:tasks[state.step][1],state.solved?null:tasks[state.step][6])})}else finish();break;case'skip':completeTravel();break;case'next':next();break;case'finish':finish();break;case'restart':journal.visits[world]=(journal.visits[world]||0)+1;journal.mode=Math.min(2,journal.visits[world]);state={step:0,solved:false};helped=false;prepareTasks();save();map();break;case'camp':camp();break;case'next-world':chooseWorld((world+1)%4);break;case'listen':if(screen==='play')say(state.solved?tasks[state.step][4]:tasks[state.step][1],state.solved?null:tasks[state.step][6]);break;case'clue':if(screen==='play'&&!state.solved){const t=tasks[state.step];helped=true;state.helped=true;save();P()?.help('find',t[5],t[0]);room.querySelector('.mq-feedback').textContent=t[3];say(t[3])}break}});
room.addEventListener('cancel',e=>{e.preventDefault();close()});room.addEventListener('close',()=>{cancelTravel();stop();document.body.classList.remove('mq-open')});document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();if(screen==='travel'){cancelTravel();map()}}});
window.addEventListener('click',e=>{if(e.target.closest('[data-path="find"]')){e.preventDefault();e.stopImmediatePropagation();open()}},true);

let travelTimer=null,travelDone=null;
function cancelTravel(){clearTimeout(travelTimer);travelTimer=null;travelDone=null;room.classList.remove('mq-travelling')}
function completeTravel(){const done=travelDone;cancelTravel();if(done&&room.open)done()}
function next(){if(screen!=='play'||!state.solved)return;travel(tasks[state.step][0]==='key'?'gate':tasks[state.step][0]==='door'?'cottage':['two','three','four'].includes(tasks[state.step][0])?'stones':state.step===14?'greeting':'walk',advance)}
function walker(){return '<div class="mq-walker" role="img" aria-label="Maya walking along the trail"><img class="mq-walker-body" src="monster.png" alt=""><img class="mq-leg-left" src="monster.png" alt=""><img class="mq-leg-right" src="monster.png" alt=""></div>'}
function travel(kind,done){
cancelTravel();stop();
if(matchMedia('(prefers-reduced-motion:reduce)').matches||document.body.classList.contains('reduced')){done();return}
screen='travel';travelDone=done;room.classList.add('mq-travelling');
const stage=Math.min(2,Math.floor(state.step/5)),labels={walk:stage===0?'Along the meadow trail…':stage===1?'Into the whispering forest…':'Up the mountain path…',gate:'Click! Through the forest gate.',cottage:'A warm welcome at the cottage.',stones:'One… two… three… across we go!',greeting:'Juppy! We made it!'};
const trees=Array.from({length:7},(_,i)=>'<g transform="translate('+(i*260)+',0)"><path d="M100 510V180" stroke="#7e7c61" stroke-width="30"/><ellipse cx="100" cy="140" rx="95" ry="120" fill="'+(stage===1?'#21ae66':'#6ed74c')+'"/><ellipse cx="135" cy="185" rx="70" ry="80" fill="#82dc46"/></g>').join('');
room.innerHTML=header()+'<main class="mq-cinema mq-route-'+kind+' mq-region-'+stage+'"><div class="mq-cinema-far"><svg viewBox="0 0 1500 700" preserveAspectRatio="none" aria-hidden="true"><rect width="1500" height="700" fill="'+(stage===1?'#b0f1c3':'#9ce7ff')+'"/><circle cx="1050" cy="110" r="50" fill="#f7dda4"/><g fill="#fffaf1"><ellipse cx="240" cy="130" rx="90" ry="26"/><ellipse cx="300" cy="110" rx="50" ry="40"/><ellipse cx="790" cy="70" rx="100" ry="27"/></g><path d="M0 490 280 150 510 430 810 50 1200 480 1400 170 1600 490" fill="#a781e9"/><path d="m725 148 85-98 106 117-64-23-39 21-36-48Z" fill="#fff9ec"/></svg></div><div class="mq-cinema-middle">'+scene(stage,true)+'</div><svg class="mq-cinema-trees" viewBox="0 0 1900 700" preserveAspectRatio="none" aria-hidden="true">'+trees+'</svg><div class="mq-walkway"></div>'+
(kind==='gate'?'<div class="mq-travel-gate"><i></i><div class="mq-gate-leaf"><span>✦</span></div><i></i></div>':'')+
(kind==='cottage'?'<div class="mq-travel-cottage"><div class="mq-cottage-roof"></div><div class="mq-cottage-window">✦</div><div class="mq-cottage-door"><i></i></div></div>':'')+
(kind==='stones'?'<div class="mq-travel-stream"></div><div class="mq-crossing">'+[0,1,2].map(i=>'<i style="--stone:'+i+'"></i>').join('')+'</div>':'')+
walker()+(kind==='greeting'?'<img class="mq-running-juppy" src="juppy-guide.png" alt="Juppy runs over to greet Maya"><div class="mq-reunion-hug"><img src="maya-juppy-hug.png" alt="Maya and Juppy give each other a happy hug"><span aria-hidden="true">♡</span></div>':'')+
'<div class="mq-cinema-foreground" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="mq-travel-caption" role="status">'+labels[kind]+'</div><button class="mq-skip-travel" data-mq="skip">Skip movement →</button></main>';
decorateTravel(kind);travelTimer=setTimeout(completeTravel,kind==='greeting'?5600:kind==='stones'?4300:3600);
}

const hugPreload=new Image();hugPreload.src='maya-juppy-hug.png';

function worldScene(stage,solved=false){
const night=world===3,n=state.step+(solved?1:0),seedling=n>7;
const tree=(x,y,scale=1)=>'<g transform="translate('+x+' '+y+') scale('+scale+')"><path d="M0 180V30" stroke="#766b49" stroke-width="20"/><ellipse cy="15" rx="72" ry="88" fill="'+(night?'#208878':'#16ae61')+'"/><ellipse cx="35" cy="45" rx="60" ry="65" fill="'+(night?'#53b77a':'#74d739')+'"/></g>';
const house='<g transform="translate(485 180)"><rect width="220" height="190" rx="7" fill="#ecd0a3"/><path d="m-30 10 140-110 140 110Z" fill="#b2836c"/><rect x="22" y="45" width="60" height="66" rx="4" fill="#c3e0d1" stroke="#9e8764" stroke-width="8"/><path d="M52 45v66M22 78h60" stroke="#9e8764" stroke-width="5"/><rect x="128" y="60" width="65" height="130" rx="7" fill="#7e8c73"/><circle cx="180" cy="125" r="5" fill="#e8ca84"/><path d="M-20 190h270v28H-20Z" fill="#b99b72"/></g>';
let background='<rect width="900" height="650" fill="'+(night?'#333278':'#8de8ff')+'"/><circle cx="730" cy="90" r="38" fill="'+(night?'#fff0ba':'#ffce29')+'"/><path d="M0 270Q240 120 480 265T900 230V650H0Z" fill="'+(night?'#2d8b78':'#9be24d')+'"/>'+[tree(40,180,1.3),tree(210,160,.9),tree(815,150,1.4)].join('');
if(world===1)background+='<path class="mq-water" d="M450 220Q240 310 460 395T340 650H900V285Q690 390 630 250Z" fill="#22cce4"/><path d="M510 270q-180 90 30 160t-80 190" fill="none" stroke="#c4ece0" stroke-width="12" stroke-linecap="round"/><path d="M0 510q220-100 340-55l-40 195H0Z" fill="#50ce45"/>'+[0,1,2].map(i=>'<ellipse cx="'+(510+i*65)+'" cy="'+(470+i*12)+'" rx="30" ry="15" fill="#c6cbb0"/>').join('')+'<g fill="#11a86b"><ellipse cx="730" cy="410" rx="34" ry="12"/><ellipse cx="770" cy="540" rx="38" ry="13"/></g><path d="M64 480Q90 360 100 330M90 440q70-80 76-60M55 460Q20 390 25 350" fill="none" stroke="#508568" stroke-width="9"/>';
if(world===2)background+='<ellipse cx="470" cy="445" rx="560" ry="180" fill="#38cbf5"/><path d="M0 580q230-100 500 0t400-25v95H0Z" fill="#65d241"/>'+house+'<path d="m500 370 150 0 30 170H450Z" fill="#b8956c"/><g stroke="#8b7858" stroke-width="5">'+[0,1,2,3,4,5].map(i=>'<path d="M'+(495-i*7)+' '+(390+i*25)+'h'+(160+i*15)+'"/>').join('')+'</g>';
if(world===2&&stage===1)background='<rect width="900" height="650" fill="#fff0b1"/><rect y="440" width="900" height="210" fill="#f2ba76"/><rect x="110" y="70" width="260" height="280" rx="15" fill="#53d4ed" stroke="#ab906c" stroke-width="20"/><path d="M120 250q120-90 240 0v90H120Z" fill="#b9dcd0"/><path d="M240 70v280M110 210h260" stroke="#ab906c" stroke-width="13"/><path d="M55 45h95v350l-65-20Z" fill="#56ca85"/><path d="M330 45h90v350l-65-20Z" fill="#56ca85"/><rect x="510" y="230" width="245" height="240" rx="30" fill="#b58aff"/><rect x="475" y="350" width="320" height="115" rx="35" fill="#d3a5ff"/><ellipse cx="550" cy="520" rx="200" ry="65" fill="#e9cd9d"/><path d="M710 230V100m-45 10h90l-20-60h-50Z" fill="#f4d88f" stroke="#9f8c69" stroke-width="8"/>';
if(world===3)background+='<path d="M330 650q180-180 80-250t180-160" fill="none" stroke="#9ca482" stroke-width="80"/><ellipse cx="220" cy="490" rx="135" ry="48" fill="#826e58"/>'+[0,1,2].map(i=>'<g transform="translate('+(140+i*75)+' 460)"><path d="M0 0v-'+(seedling?50:10)+'" stroke="#94c37c" stroke-width="7"/>'+(seedling?'<path d="M0-25q-45-40-35 0 20 15 35 0m0-15q45-40 35 0-20 15-35 0" fill="#91bf79"/>':'')+'</g>').join('')+'<path d="m560 510 100-145 105 145Z" fill="#d5b997"/><path d="m625 510 35-105 38 105" fill="#536f64"/>'+Array.from({length:12},(_,i)=>'<circle class="mq-firefly" style="animation-delay:'+(i*.19)+'s" cx="'+(100+i*61)+'" cy="'+(130+i%4*65)+'" r="4" fill="#ffef55"/>').join('');
return '<svg class="mq-landscape mq-world-'+world+'" viewBox="0 0 900 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+background+'<g fill="'+(night?'#dbc28c':'#f4d092')+'">'+[70,340,780].map(x=>'<circle cx="'+x+'" cy="570" r="7"/>').join('')+'</g></svg>';
}
function chooseWorld(n){if(!Number.isInteger(n)||n<0||n>3)return;save();world=n;journal.world=n;state=journal.states[n]?{...journal.states[n]}:{step:0,solved:false};helped=!!state.helped;prepareTasks();save();map()}
function map(){
cancelTravel();stop();screen='map';const names=['Mountain picnic','River adventure','Lily’s lake house','Firefly garden'];
room.innerHTML=header()+'<main class="mq-map mq-simple-cover"><div class="mq-map-art">'+scene(world?0:2)+'<img src="maya-pointing-summit.png" alt="Maya points towards '+hosts[world].name+'" class="mq-map-maya"><img src="'+hosts[world].image+'" alt="'+hosts[world].name+' waits for Maya" class="mq-map-juppy"><div class="mq-cover-copy"><h1>'+names[world]+'</h1><button class="mq-primary mq-cover-play" data-mq="'+(state.step===15?'finish':'start')+'"><span aria-hidden="true">▶</span> '+(state.step===15?'Visit':state.step?'Keep going':'Let’s go!')+'</button></div></div></main>';
room.insertAdjacentHTML('beforeend','<nav class="mq-world-picker" aria-label="Choose an adventure">'+worlds.map((w,i)=>'<button data-world="'+i+'" aria-current="'+(i===world?'page':'false')+'"><span aria-hidden="true">'+['⛰','🌿','🏡','✨'][i]+'</span><b>'+['Mountain','River','Lake house','Garden'][i]+'</b></button>').join('')+'<button data-mq="camp"><span aria-hidden="true">⛺</span><b>Our camp</b></button></nav><details class="mq-adult-options"><summary>Grown-ups: clue level</summary><div class="mq-clue-modes" role="group" aria-label="Choose how to explore">'+['Name it','Follow a clue','Solve it'].map((name,i)=>'<button data-quest-mode="'+i+'" aria-pressed="'+(journal.mode===i)+'">'+name+'</button>').join('')+'</div></details>');room.scrollTop=0;
}
function checkpoint(){
if(!world){mountainCheckpoint();return}
cancelTravel();stop();screen='checkpoint';const w=worlds[world],i=state.step/5-1;
room.innerHTML=header()+'<main class="mq-checkpoint">'+worldScene(i)+'<section><img src="maya-celebrate.png" alt="Maya celebrates"><small>FIVE MORE DISCOVERIES</small><h1>'+w.stops[i]+' explored!</h1><p>Our next stop is '+w.stops[i+1]+'. Shall we keep going, or rest here?</p><button class="mq-primary" data-mq="start">Keep exploring →</button><button data-mq="close">Take a little break</button><small>Your place is saved.</small></section></main>';say('Five discoveries! Our next stop is '+w.stops[i+1]+'. We can rest or keep exploring.');
}
function finish(){
mountainFinish();const w=worlds[world],section=room.querySelector('.mq-finish section');
if(world)section.querySelector('.mq-hug-finale').innerHTML=friends()+'<span aria-hidden="true">♡</span>';
section.querySelector('h1').textContent=w.ending;
section.querySelector('p').textContent=w.next;
section.querySelector('[data-mq="restart"]').textContent='Explore here again ↻';
section.querySelector('.mq-picnic').innerHTML=art(w.reward)+'<span class="mq-camp-gift">'+w.rewardName+' for our campsite</span>';
section.insertAdjacentHTML('beforeend','<div class="mq-next-adventure"><button class="mq-primary" data-mq="'+(world<3?'next-world':'camp')+'">'+(world<3?'Next: '+['','the riverside','the lake house','the firefly garden'][world+1]+' →':'Visit our campsite →')+'</button><button data-mq="camp">Our campsite ⛺</button></div>');
say(w.ending+'. '+w.next);
}
function camp(){
room.scrollTop=0;
cancelTravel();stop();screen='camp';room.innerHTML=header()+'<main class="mq-camp"><div class="mq-camp-heading"><small>OUR LITTLE PLACE IN THE WORLD</small><h1>Look what we made.</h1><p>Tap a discovery. Remember an adventure. Choose where to go next.</p></div><section class="mq-camp-scene">'+worldScene(0)+'<div class="mq-camp-tent">⛺</div><img src="maya-juppy-hug.png" alt="Maya and Juppy at camp"><div class="mq-camp-items">'+worlds.map((w,i)=>journal.camp.includes(i)?'<button data-camp-item="'+w.rewardName+'. A memory from '+w.title+'.">'+art(w.reward)+'<span>'+w.rewardName+'</span></button>':'<div class="mq-camp-empty"><span>✦</span><small>A memory to make</small></div>').join('')+'</div></section><div class="mq-camp-routes">'+worlds.map((w,i)=>'<button data-world="'+i+'">'+['⛰ Mountain','🌿 Riverside','🏡 Lake house','✨ Firefly garden'][i]+' →</button>').join('')+'</div><p class="mq-small">Our campsite stays on this device. Come back whenever you like.</p></main>';
}
function decorateTravel(kind){
if(!world)return;
const friend=room.querySelector('.mq-running-juppy');if(friend){friend.src=hosts[world].image;friend.alt=hosts[world].name+' welcomes Maya'}
const reunion=room.querySelector('.mq-reunion-hug');if(reunion)reunion.innerHTML=friends()+'<span aria-hidden="true">♡</span>';
const stage=Math.min(2,Math.floor(state.step/5));
room.querySelector('.mq-cinema-far').innerHTML=worldScene(stage,true);
room.querySelector('.mq-cinema-middle').style.display='none';
room.querySelector('.mq-cinema').classList.add('mq-world-travel-'+world);
const caption=room.querySelector('.mq-travel-caption');
if(kind==='walk')caption.textContent=stops[stage]+'…';
if(kind==='greeting')caption.textContent=hosts[world].name+'! We made it!';
if(world===2&&stage===1)room.querySelector('.mq-cinema-trees').style.display='none';
if(['two','three','four'].includes(tasks[state.step]?.[0])&&kind==='stones'){
const count={two:2,three:3,four:4}[tasks[state.step][0]];
if(count!==3){room.querySelector('.mq-crossing').innerHTML=Array.from({length:count},(_,i)=>'<i style="--stone:'+i+'"></i>').join('');caption.textContent=count+' little steps across…';room.querySelector('.mq-walker').style.animationName='mq-walk-across'}
}
}

window.MountainQuest={open};
})();
