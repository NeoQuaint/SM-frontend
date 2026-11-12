
(()=>{
'use strict';
const A=window.ObjectsPlayhouseArt,$=s=>document.querySelector(s);
const rooms=[
{name:'The cosy room',hint:'Little things that make a home.',items:[['bed',27,67,36,'We rest in a bed.'],['chair',72,73,24,'We sit on a chair.'],['door',85,48,25,'A door opens into another room.'],['lamp',17,29,21,'A lamp gives us light.'],['clock',71,17,17,'A clock helps us tell the time.'],['key',57,49,15,'A key can unlock a door.']]},
{name:'Ready for a picnic',hint:'What shall we take with us?',items:[['cup',24,44,18,'We drink from a cup.'],['spoon',46,44,14,'We eat with a spoon.'],['knife',65,43,14,'A grown-up can help us spread with a table knife.'],['book',24,74,22,'We read a book.'],['shoe',72,80,24,'We wear shoes on our feet.'],['umbrella',82,20,28,'An umbrella helps keep us dry.']]},
{name:'The wonder garden',hint:'Look up. Look around. What can you find?',items:[['mountain',28,42,43,'A mountain reaches high into the sky.'],['cloud',54,23,27,'A cloud floats across the sky.'],['sun',83,12,18,'The sun lights up our day.'],['moon',83,12,18,'We can look for the moon in the sky.'],['tree',77,58,36,'A tree has a trunk, branches and leaves.'],['flower',25,82,21,'A flower grows and blooms.']]}
];
const key='smartclass-object-discoveries-v1';let discovered=new Set();try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))discovered=new Set(saved.filter(x=>rooms.some(r=>r.items.some(i=>i[0]===x))))}catch{}
let place=0,night=false,hunting=false,targets=[],turn=0,solved=false,selected='',lastFocus=null,audio=null,token=0,popTimer=null;
const room=document.createElement('dialog');room.id='objects-playhouse';room.setAttribute('aria-label','Juppy’s little discovery house');document.body.append(room);
const pocket=document.createElement('dialog');pocket.id='objects-pocket';pocket.setAttribute('aria-label','My object discoveries');document.body.append(pocket);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const visible=()=>rooms[place].items.filter(i=>i[0]!==(night?'sun':'moon'));
function stop(){token++;if(audio){audio.pause();audio=null}window.KidsVoice?.cancel()}
function speak(text){stop();if($('#sound')?.getAttribute('aria-pressed')==='false'||document.hidden)return;const stamp=token,src=window.KOKORO_CLIPS?.[text]||window.KOKORO_CLIPS?.[text.replace(/\.$/,'').toLowerCase()];function fallback(){if(stamp!==token||!window.KidsVoice)return;const u=new KidsVoice.Utterance(text);u.lang='en-GB';u.rate=.82;KidsVoice.speak(u)}if(src){audio=new Audio(src);audio.onerror=fallback;audio.play().catch(fallback)}else fallback()}
function open(){if(window.SmartClassMembership?.begin('objects','picnic')===false)return;clearTimeout(advanceTimer);clearTimeout(hintTimer);travelling=false;journey=true;step=0;passed=false;apples=0;packed=[];lastFocus=document.activeElement;window.KidsBridge.stop();window.KidsLearning.cancel();window.KidsSpelling.cancel();window.KidsResearch?.cancel();window.KidsSound.close();place=0;hunting=false;selected='';document.body.classList.add('op-open');if(!room.open)room.showModal();render();speak(story[step].ask)}
function close(){clearTimeout(advanceTimer);clearTimeout(hintTimer);stop();clearTimeout(popTimer);if(pocket.open)pocket.close();room.close();document.body.classList.remove('op-open');lastFocus?.focus()}
function render(){room.classList.remove('guided-journey');stop();selected='';room.innerHTML='<div class="op-wrap"><header class="op-header"><button data-op="close" aria-label="Back to playroom">←</button><span>Juppy’s little world <i>✦</i></span><button data-op="pocket" aria-label="Open my discoveries">🧺 <b>'+discovered.size+'</b></button></header><div class="op-heading"><div><small>TOUCH A LITTLE WONDER</small><h1>'+rooms[place].name+'</h1></div>'+(place===2?'<button class="op-time" data-op="time" '+(hunting?'disabled':'')+' aria-label="'+(night?'Change to daytime':'Change to night-time')+'">'+(night?'☀ Day':'☾ Night')+'</button>':'')+'</div><div class="op-layout"><section class="op-scene '+(night&&place===2?'op-night':'')+'" aria-label="'+rooms[place].name+', interactive scene"><div class="op-background">'+A.background(place)+'</div>'+(night&&place===2?'<div class="op-stars" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦ &nbsp; ✧</div>':'')+visible().map(([name,x,y,size])=>'<button class="op-object object-'+name+'" data-object-name="'+name+'" style="left:'+x+'%;top:'+y+'%;width:'+size+'%" aria-label="'+name+'"><span class="op-object-art">'+A.svg(name)+'</span><span class="op-item-label">'+name+'</span></button>').join('')+'<div class="op-room-marker">'+(place+1)+' / 3</div></section><aside class="op-companion"><img src="juppy-guide.png" alt="Juppy, your green discovery friend"><div class="op-speech"><span class="op-mode">'+(hunting?'A LITTLE FINDING ADVENTURE':'LET’S EXPLORE')+'</span><h2 class="op-word">'+(hunting?'Find the '+targets[turn]+'.':'What catches your eye?')+'</h2><p class="op-description">'+(hunting?'Listen, look, and tap.':rooms[place].hint)+'</p><p class="op-status" role="status"></p><button class="op-listen" data-op="listen" aria-label="Listen again">🔊 Listen again</button></div><div class="op-hunt-progress" '+(!hunting?'hidden':'')+' aria-label="'+turn+' of 3 found">'+[0,1,2].map(i=>'<span class="'+(i<turn?'earned':'')+'">✦</span>').join('')+'</div><button class="op-main-button" data-op="'+(hunting?'free':'hunt')+'">'+(hunting?'Just explore':'Help Juppy find things →')+'</button><button class="op-next-find" data-op="next-find" hidden>Find another →</button></aside></div><nav class="op-travel" aria-label="Explore another place"><button data-op="previous" aria-label="Go to '+rooms[(place+2)%3].name+'">← <span>'+rooms[(place+2)%3].name+'</span></button><span class="op-travel-dots" aria-hidden="true">'+rooms.map((_,i)=>'<i class="'+(i===place?'current':'')+'"></i>').join('')+'</span><button data-op="next" aria-label="Go to '+rooms[(place+1)%3].name+'"><span>'+rooms[(place+1)%3].name+'</span> →</button></nav></div>';room.scrollTop=0;if(journey)drawJourney();else if(hunting)juppyMood(false) }
function announce(s){room.querySelector('.op-status').textContent=s}
function tap(name){if(journey){journeyTap(name);return}const item=visible().find(i=>i[0]===name);if(!item)return;selected=name;discovered.add(name);try{localStorage.setItem(key,JSON.stringify([...discovered]))}catch{}room.querySelector('[data-op="pocket"] b').textContent=discovered.size;const b=room.querySelector('[data-object-name="'+name+'"]');room.querySelectorAll('.op-object').forEach(x=>x.classList.remove('op-selected','op-pop'));b.classList.add('op-selected');void b.offsetWidth;b.classList.add('op-pop');if(name==='lamp')b.classList.toggle('op-lit');room.querySelector('.op-word').textContent=name;room.querySelector('.op-description').textContent=item[4];speak(name[0].toUpperCase()+name.slice(1)+'.');
if(hunting&&!solved){window.KidsProgress?.attempt('objects','Finding objects',targets[turn],name===targets[turn]);if(name===targets[turn]){solved=true;juppyMood(true);room.querySelectorAll('.op-hunt-progress span')[turn].classList.add('earned');announce('You found the '+name+'!');const n=room.querySelector('.op-next-find');n.hidden=false;n.textContent=turn===2?'Our discoveries! ✨':'Find another →'}else{announce('That is the '+name+'. Can you find the '+targets[turn]+'?');room.querySelector('.op-word').textContent='Find the '+targets[turn]+'.'}}else if(!hunting){window.KidsProgress?.explore('objects',name);announce('A little discovery for your basket!')}}
function hunt(){hunting=true;targets=shuffle(visible().map(x=>x[0])).slice(0,3);turn=0;solved=false;render();speak('Can you find the '+targets[turn]+'?')}
function nextFind(){if(!solved)return;if(turn===2){hunting=false;solved=false;render();room.querySelector('.op-word').textContent='Three lovely discoveries!';room.querySelector('.op-description').textContent='You listened, looked and found them all.';announce('Keep exploring, or visit another room.');speak('You found them all. Well done!');return}turn++;solved=false;render();speak('Can you find the '+targets[turn]+'?')}
function travel(delta){place=(place+delta+3)%3;hunting=false;solved=false;render();speak(rooms[place].name+'. Tap anything to explore.')}
function showPocket(){stop();const all=rooms.flatMap(r=>r.items);pocket.innerHTML='<button data-op-pocket-close>← Back to exploring</button><h1>My little discoveries</h1><p>'+discovered.size+' of 18 found. Your discoveries stay on this device.</p><div>'+all.map(([name])=>'<article class="'+(discovered.has(name)?'found':'waiting')+'">'+A.svg(name)+'<b>'+(discovered.has(name)?name:'?')+'</b></article>').join('')+'</div>';pocket.showModal()}
room.addEventListener('click',e=>{const o=e.target.closest('[data-object-name]');if(o){tap(o.dataset.objectName);return}const b=e.target.closest('[data-op]');if(!b)return;if(journey&&journeyAction(b.dataset.op))return;switch(b.dataset.op){case'close':close();break;case'next':travel(1);break;case'previous':travel(-1);break;case'hunt':hunt();break;case'free':hunting=false;render();break;case'next-find':nextFind();break;case'time':if(!hunting){night=!night;render();speak(night?'Night-time. Look for the moon.':'Daytime. Look for the sun.')}break;case'listen':speak(hunting&&!solved?'Can you find the '+targets[turn]+'?':selected?visible().find(x=>x[0]===selected)[4]:'Tap something and see what happens.');break;case'pocket':showPocket();break}});
pocket.addEventListener('click',e=>{if(e.target.closest('[data-op-pocket-close]'))pocket.close()});room.addEventListener('cancel',e=>{e.preventDefault();close()});room.addEventListener('close',()=>{stop();document.body.classList.remove('op-open')});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
window.addEventListener('click',e=>{if(e.target.closest('[data-path="objects"]')){e.preventDefault();e.stopImmediatePropagation();open()}},true);

let journey=true,step=0,passed=false,apples=0,packed=[],advanceTimer=null,hintTimer=null,travelling=false;
function clueBounce(){const q=story[step];const el=room.querySelector(q.target?'[data-object-name="'+q.target+'"]':q.kind==='letter'?'[data-letter="C"]':'[data-apple]:not(:disabled)');if(el){el.classList.remove('op-hint');void el.offsetWidth;el.classList.add('op-hint');}}
function advanceJourney(){if(!room.open||!passed||travelling)return;clearTimeout(advanceTimer);clearTimeout(hintTimer);const next=story[step+1];if(!next)return;const change=next.room!==place;travelling=true;if(change)room.querySelector('.op-scene').classList.add('op-walking');advanceTimer=setTimeout(()=>{if(!room.open)return;step++;passed=false;travelling=false;place=next.room;if(next.kind==='finish')window.KidsProgress?.complete('objects','Juppy’s picnic adventure');render();speak(next.ask);},change?2400:350);}
function frameJourney(){const q=story[step],scene=room.querySelector('.op-scene'),companion=room.querySelector('.op-companion');scene.append(companion);scene.append(room.querySelector('.op-header'));room.querySelector('.op-heading').hidden=true;room.querySelector('.journey-map').hidden=true;room.querySelector('.journey-free').hidden=true;room.querySelector('.op-mode').hidden=true;room.querySelector('.op-description').hidden=true;room.querySelector('.op-word').textContent=q.kind==='finish'?'We did it!':q.target?'Find the '+q.target:q.kind==='letter'?'Match C':'Pack 3 apples';const listen=room.querySelector('[data-op="listen"]');listen.textContent='🔊';listen.setAttribute('aria-label','Listen again');const clue=room.querySelector('[data-op="clue"]');if(clue){clue.textContent='💡';clue.setAttribute('aria-label','Show me a hint');}const next=room.querySelector('[data-op="journey-next"]');if(next){next.textContent='➜';next.setAttribute('aria-label','Continue');}scene.insertAdjacentHTML('beforeend','<div class="op-stage-progress"><span aria-hidden="true">'+['🏠','🧺','🌳'][place]+'</span><progress max="8" value="'+step+'" aria-label="Adventure progress"></progress><span>'+step+'/8</span></div>');clearTimeout(hintTimer);if(q.kind!=='finish')hintTimer=setTimeout(()=>{if(room.open&&!passed)clueBounce()},6500);}

const story=[
{room:0,title:'A picnic with Juppy',ask:'Will you help me get ready for a picnic? First, we need a little light. What can we switch on?',target:'lamp',clue:'Look for the lamp with a shade.',yes:'You switched on the lamp! Now we can see.',next:'Find our way out →'},
{room:0,title:'A tiny treasure',ask:'The door is locked. What could help us open it?',target:'key',clue:'Find the small golden key.',yes:'A key! Let’s try it in the door.',next:'Try the key →'},
{room:0,title:'Open sesame!',ask:'We have the key. Can you tap the door to open it?',target:'door',clue:'The tall door is on the right.',yes:'Click! You opened the door. Let’s pack our picnic.',next:'Into the next room →'},
{room:1,title:'Something to drink from',ask:'I might get thirsty. What can I drink water from?',target:'cup',clue:'Find the cup with a handle.',yes:'The cup is in our picnic basket!',next:'One more thing →'},
{room:1,title:'A story for our picnic',ask:'I would love a story under the tree. What should we take to read?',target:'book',clue:'Look for the book with pages.',yes:'Our book is packed. A picnic and a story!',next:'A little letter surprise →'},
{room:1,title:'C is for cup',ask:'Cup begins with C. Can you match this letter? C.',kind:'letter',clue:'Look at the curved letter C. Find the same shape below.',yes:'C! You matched the first letter in cup.',next:'Pack some apples →'},
{room:1,title:'Three apples to share',ask:'Let’s pack three apples. Tap an apple to put it in the basket. Count with me!',kind:'count',clue:'Tap the apples one at a time. We need three.',yes:'One, two, three! Three apples for our picnic.',next:'To the garden →'},
{room:2,title:'Our shady picnic spot',ask:'We made it outside! What has a trunk and leaves, and gives us shade?',target:'tree',clue:'Find the big green tree on the right.',yes:'The tree! A lovely shady place for our picnic.',next:'Spread our picnic →'},
{room:2,title:'We did it together!',ask:'You lit the room, opened the door, packed our picnic and counted three apples. Thank you for helping me! Shall we explore some more?',kind:'finish'}
];
function journeyAction(action){
if(action==='close'||action==='pocket')return false;
if(action==='listen'){speak(passed?story[step].yes:story[step].ask);return true}
if(action==='clue'){window.KidsProgress?.help('objects','Object clues',story[step].target||story[step].title);announce(story[step].clue);clueBounce();speak(story[step].clue);return true}
if(action==='journey-next'&&passed){advanceJourney();return true}
if(action==='explore'){journey=false;hunting=false;render();speak('Tap anything to explore.');return true}
if(action==='restart'){step=0;passed=false;apples=0;packed=[];place=0;render();speak(story[0].ask);return true}
return true;
}
function juppyMood(happy){const img=room.querySelector(".op-companion>img");if(!img)return;img.src=happy?"juppy-guide.png":"juppy-curious.png";img.alt=happy?"Juppy is happy you found it!":"Juppy looks curious, searching with you";img.classList.toggle("juppy-happy",happy)}
function win(){if(!passed)window.KidsProgress?.explore('objects',story[step].title);
if(passed)return;passed=true;juppyMood(true);
room.querySelector('.op-word').textContent='You helped!';
room.querySelector('.op-description').textContent=story[step].yes;
announce('✓');clearTimeout(hintTimer);room.querySelector('.op-stage-progress progress').value=step+1;room.querySelector('.op-stage-progress span:last-child').textContent=(step+1)+'/8';
room.querySelector('[data-op="journey-next"]').hidden=false;
room.querySelector('[data-op="clue"]').hidden=true;
speak(story[step].yes);clearTimeout(advanceTimer);advanceTimer=setTimeout(advanceJourney,6500);
}
function journeyTap(name){
const q=story[step];if(passed||!q.target)return;
const b=room.querySelector('[data-object-name="'+name+'"]');
b.classList.remove('op-pop');void b.offsetWidth;b.classList.add('op-pop');
window.KidsProgress?.attempt('objects','Object clues',q.target,name===q.target);if(name!==q.target){announce('That is the '+name+'. '+q.ask);speak('That is the '+name+'. '+q.ask);return}
discovered.add(name);try{localStorage.setItem(key,JSON.stringify([...discovered]))}catch{}
room.querySelector('[data-op="pocket"] b').textContent=discovered.size;
b.classList.add('op-selected');
if(name==='lamp'){b.classList.add('op-lit');room.querySelector('.op-scene').classList.add('journey-lit')}
if(name==='door')b.classList.add('journey-door-open');
if(name==='cup'||name==='book'){packed.push(name);b.classList.add('journey-packed');updateBasket()}
win();
}
function updateBasket(){const b=room.querySelector('.journey-basket');if(b)b.innerHTML='<span>🧺</span>'+packed.map(n=>'<span title="'+n+'">'+A.svg(n)+'</span>').join('')+Array.from({length:apples},()=>'<span>🍎</span>').join('')}
function drawJourney(){
const q=story[step];night=false;juppyMood(q.kind==='finish');
room.classList.add('guided-journey');
room.querySelector('.op-heading small').textContent='JUPPY’S PICNIC ADVENTURE';
room.querySelector('.op-heading h1').textContent=q.title;
room.querySelector('.op-time')?.remove();
room.querySelector('.op-mode').textContent='LET’S DO IT TOGETHER';
room.querySelector('.op-word').textContent=q.kind==='finish'?'Our lovely picnic!':'Can you help me?';
room.querySelector('.op-description').textContent=q.ask;
room.querySelector('.op-main-button').remove();room.querySelector('.op-next-find').remove();
room.querySelector('.op-travel').outerHTML='<nav class="journey-map" aria-label="Our picnic journey">'+['🏠 Home','🧺 Pack','🌳 Garden'].map((n,i)=>'<span '+(place===i?'aria-current="step"':'')+' class="'+(i<place?'done':i===place?'active':'')+'">'+(i<place?'✓ ': '')+n+'</span>').join('<i>···</i>')+'</nav><button class="journey-free" data-op="explore">Just explore</button>';
room.querySelector('.op-companion').insertAdjacentHTML('beforeend',q.kind==='finish'?'<button class="op-main-button" data-op="restart">Another picnic? ↻</button>':'<div class="journey-controls"><button data-op="clue">A little clue ✨</button><button data-op="journey-next" hidden>'+q.next+'</button></div>');
const scene=room.querySelector('.op-scene');scene.insertAdjacentHTML('beforeend','<div class="journey-basket" aria-label="Our packed picnic basket"></div>');updateBasket();
if(place===0&&step>0)room.querySelector('.object-lamp').classList.add('op-lit');
packed.forEach(n=>room.querySelector('.object-'+n)?.classList.add('journey-packed'));
if(q.kind==='letter'||q.kind==='count'){
scene.querySelectorAll('.op-object').forEach(b=>b.hidden=true);
scene.insertAdjacentHTML('beforeend','<div class="journey-challenge">'+(q.kind==='letter'?'<div class="journey-model">C <small>is for cup</small>'+A.svg('cup')+'</div><div class="journey-letters">'+['B','C','A'].map(n=>'<button data-letter="'+n+'">'+n+'</button>').join('')+'</div>':'<h2>Let’s pack <strong>3</strong></h2><div class="journey-apples">'+[1,2,3,4,5].map(n=>'<button data-apple="'+n+'" aria-label="Pack apple '+n+'">🍎</button>').join('')+'</div><p class="journey-count" aria-live="polite">0 / 3</p>')+'</div>');
scene.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{if(passed)return;window.KidsProgress?.attempt('objects','Letter matching','C for cup',b.dataset.letter==='C');if(b.dataset.letter==='C'){b.classList.add('correct');win()}else{announce('Let’s look at C again. Can you match its shape?');speak('Look at C again. Can you match its shape?')}});
scene.querySelectorAll('[data-apple]').forEach(b=>b.onclick=()=>{if(passed||b.disabled)return;b.disabled=true;apples++;updateBasket();scene.querySelector('.journey-count').textContent=apples+' / 3';if(apples===3){window.KidsProgress?.explore('objects','Counting three apples with Juppy');win();}else speak(apples===1?'One.':'Two.')});
}
if(q.kind==='finish'){
scene.insertAdjacentHTML('beforeend','<div class="journey-picnic"><img src="juppy-guide.png" alt="Juppy enjoying the picnic"><div class="journey-blanket">'+packed.map(n=>'<span>'+A.svg(n)+'</span>').join('')+'<span>🍎 🍎 🍎</span></div><b>You made this happen! ✨</b></div>');
}
frameJourney();
}

["juppy-guide.png","juppy-curious.png"].forEach(src=>{const image=new Image();image.src=src});
window.ObjectsPlayhouse={open};
})();
