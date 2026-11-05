(()=>{
const $=s=>document.querySelector(s);
const animals=[['dog','🐕','Woof, woof!'],['cat','🐈','Meow, meow!'],['cow','🐄','Moo, moo!'],['sheep','🐑','Baa, baa!'],['duck','🦆','Quack, quack!'],['pig','🐖','Oink, oink!']];
const fruits=[['apple','🍎'],['banana','🍌'],['orange','🍊'],['grapes','🍇'],['pear','🍐'],['strawberry','🍓']];
const colours=[['red','#eb5464'],['blue','#4b94e7'],['yellow','#ffd650'],['green','#65b780'],['purple','#a27cd5'],['orange','#f4a053']];
const shapes=[['circle','●'],['square','■'],['triangle','▲'],['star','★']];
const games=[{id:'animals',title:'Animal friends',desc:'Listen & find the animal',art:'🐕 🐈',bg:'#fff0d6',shadow:'#eed8af'},{id:'sounds',title:'Who says moo?',desc:'Match a sound to a friend',art:'🐄 ♪',bg:'#ede4ff',shadow:'#d8c9ed'},{id:'fruit',title:'Fruit basket',desc:'Find something delicious',art:'🍎 🍌',bg:'#ffe5e8',shadow:'#efcbd4'},{id:'count',title:'Little counters',desc:'Count one little thing at a time',art:'<span class="digit d1">1</span><span class="digit d2">2</span><span class="digit d3">3</span>',bg:'#e4f3e0',shadow:'#c8dfc1'},{id:'colours',title:'Colour garden',desc:'Find your favourite colours',art:'🌈',bg:'#e0f2fa',shadow:'#c0dce9'},{id:'shapes',title:'Shape explorers',desc:'Circles, squares & more',art:'🔺 🟣',bg:'#ffebd8',shadow:'#edd1b7'}];

games.push({id:'objects',title:'Find an object',desc:'Everyday discoveries'},{id:'actions',title:'Actions',desc:'What are they doing?'},{id:'outside',title:'Outside',desc:'Sky, mountains & growing things'},{id:'home',title:'At home',desc:'Things around our home'},{id:'everyday',title:'Everyday things',desc:'Little things we use'});
let intro=false,introAudio=null,introTimer=null,introTicket=0;
let teaching=false,teachIndex=0,teachTimer=null,lesson=[],findPlan=[];
let mixed=false, mixedBag=[], anchor=null, attempts=0, helped=false, collection=[];
let level=0,quiet=false,musicOn=true,kind='',round=0,target=null,choices=[],answered=false,previous='',completed=0,explored=new Set(),counted=new Set(),currentAudio=null,voiceTicket=0,partyTimer=null,danceTimer=null,advanceTimer=null;
const shuffle=input=>{const a=input.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sound=window.KidsSound;
const cueNames=['One.','Two.','Three.','Four.','Five.','Six.','Seven.','Eight.','Nine.','Ten.'];
function stop(){$('#game').classList.remove('animal-calling');if((teaching||intro)&&window.KidsVoice)window.KidsVoice.cancel();voiceTicket++;if(currentAudio){currentAudio.pause();currentAudio.removeAttribute('src');currentAudio.load();currentAudio=null}sound.duck(false);$('#game').classList.remove('speaking')}
function audioNotice(){const e=$('.audio-status');if(e)e.textContent='Tap the speaker to listen.';sound.duck(false);$('#game').classList.remove('speaking')}
function say(text,onDone){stop();if(quiet||document.hidden)return;const src=window.KOKORO_CLIPS?.[text];if(!src){audioNotice();return}const ticket=voiceTicket;currentAudio=new Audio(src);currentAudio.preload='auto';if(teaching){currentAudio.playbackRate=1.06;currentAudio.preservesPitch=false}sound.duck(true);$('#game').classList.add('speaking');currentAudio.onended=()=>{if(ticket===voiceTicket){sound.duck(false);$('#game').classList.remove('speaking');const e=$('.audio-status');if(e)e.textContent='';onDone?.()}};currentAudio.onerror=()=>{if(ticket===voiceTicket)audioNotice()};currentAudio.play().catch(()=>{if(ticket===voiceTicket)audioNotice()})}
$('#cards').innerHTML=games.filter(g=>!window.KIDS_OBJECTS?.[g.id]).map(g=>'<button class="activity" data-game="'+g.id+'" style="--bg:'+g.bg+';--shadow:'+g.shadow+'"><div class="art" aria-hidden="true">'+g.art+'</div><h3>'+g.title+'</h3><p>'+g.desc+'</p><span class="arrow" aria-hidden="true">↗</span></button>').join('');
function prompt(){if(kind==='actions')return 'Who is '+target[0]+'?';if(kind==='sounds')return 'Which animal makes this sound?';if(kind==='count')return 'How many apples can you count?';return 'Can you find the '+target[0]+'?'}

function playAnimalPrompt(){
 stop();if(quiet||document.hidden)return;
 const ticket=voiceTicket,animal=target[0];
 const status=$('.audio-status');if(status)status.textContent='Listen…';
 const clip=new Audio('animal-sounds/'+animal+'.mp3');currentAudio=clip;clip.preload='auto';clip.volume=.8;sound.duck(true);
 let ended=false;
 const done=()=>{if(ended||ticket!==voiceTicket)return;ended=true;clip.pause();clip.onended=null;clip.ontimeupdate=null;if(status)status.textContent='';say('Which animal makes this sound?')};
 clip.onended=done;clip.ontimeupdate=()=>{if(clip.currentTime>=3)done()};
 clip.onerror=()=>{if(ticket===voiceTicket){clip.pause();audioNotice();if(status)status.textContent='Tap ▶ to try the sound again.'}};
 clip.play().catch(()=>{if(ticket===voiceTicket)audioNotice()});
}
function listenPrompt(){if(kind==='sounds')playAnimalPrompt();else if(kind==='animals'){const name=target[0];say(prompt(),()=>namedAnimalCall(name))}else say(prompt())}
function visualPrompt(){if(kind==='actions')return 'Who is '+target[0]+'?';if(kind==='sounds')return 'Who is it?';if(kind==='count')return 'Tap & count!';return 'Find '+(kind==='colours'?'':'the ')+target[0]+'!'}
function picture(item){const world=item._world||kind;if(window.KIDS_OBJECTS?.[world]&&item[1].startsWith('<svg'))return item[1];if(world==='animals'||world==='sounds')return '<svg class="animal-art" viewBox="0 0 160 160" aria-hidden="true">'+window.KIDS_ART[item[0]]+'</svg>';if(world==='colours')return '<span class="paint-drop" style="--paint:'+item[1]+'"><i></i></span>';if(world==='shapes'){const path={circle:'<circle cx="50" cy="50" r="39"/>',square:'<rect x="12" y="12" width="76" height="76" rx="5"/>',triangle:'<path d="M50 8 94 88H6Z"/>',star:'<path d="m50 5 13 29 32 3-24 22 7 33-28-17-28 17 7-33L5 37l32-3Z"/>'}[item[0]];return '<svg class="shape-art" viewBox="0 0 100 100" aria-hidden="true">'+path+'</svg>'}if(world==='count')return '<span class="big-number">'+item[0]+'</span>';return '<span class="fruit-art">'+item[1]+'</span>'}
function toolbar(){clearTimeout(danceTimer);sound.endDance?.();$('#game').classList.remove('is-finished');return '<div class="play-toolbar"><button class="play-control" data-close aria-label="Back to playroom">⌂</button><div class="star-trail" role="img" aria-label="'+round+' of 5 discoveries">'+Array.from({length:5},(_,i)=>'<span class="'+(i<round?'earned':'')+'" aria-hidden="true">★</span>').join('')+'</div><div class="audio-tools"><button class="play-control" data-music aria-label="'+(musicOn?'Turn music off':'Turn music on')+'" aria-pressed="'+musicOn+'">'+(musicOn?'♫':'♪̸')+'</button><button class="play-control" data-sound aria-label="'+(quiet?'Turn sound on':'Turn sound off')+'" aria-pressed="'+!quiet+'">'+(quiet?'🔇':'🔊')+'</button></div></div>'}

function makeLesson(){
 const wrap=(world,item)=>{const copy=item.slice();copy._world=world;return {kind:world,target:copy}};
 const friends=shuffle(animals).slice(0,2).map(x=>wrap('animals',x));
 const pools={fruit:fruits,colours,shapes,objects:window.KIDS_OBJECTS?.objects||animals};
 const worlds=shuffle(Object.keys(pools)).slice(0,2);
 lesson=[...friends,...worlds.map(w=>wrap(w,shuffle(pools[w])[0]))];
 findPlan=[lesson[0],lesson[1],lesson[2],lesson[0],lesson[3]];
}
function cancelTeaching(){cancelIntro();$('#game').classList.remove('intro-dancing');if(teaching)stop();clearTimeout(teachTimer);teaching=false;$('#game').classList.remove('is-teaching')}
function scheduleTeaching(){clearTimeout(teachTimer);teachTimer=setTimeout(()=>{
 if(!teaching||!$('#game').open)return;
 if(document.hidden||window.KidsVoice?.speaking||currentAudio&&!currentAudio.ended&&!currentAudio.paused){scheduleTeaching();return}
 teachIndex++;if(teachIndex<lesson.length)showTeaching();else{cancelTeaching();round=0;renderRound()}
 },5500)}

function namedAnimalCall(name){
 if(!$('#game').open||quiet||document.hidden||kind!=='animals')return;
 stop();const ticket=voiceTicket;const clip=new Audio('animal-sounds/'+name+'.mp3');currentAudio=clip;clip.volume=.8;clip.preload='auto';sound.duck(true);
 $('#game').classList.add('animal-calling');
 const done=()=>{if(ticket!==voiceTicket)return;clip.pause();clip.onended=null;clip.ontimeupdate=null;sound.duck(false);$('#game').classList.remove('animal-calling')};
 clip.onended=done;clip.ontimeupdate=()=>{if(clip.currentTime>=3)done()};clip.onerror=()=>{done();audioNotice()};clip.play().catch(()=>{done();audioNotice()});
}
function repeatTeaching(){
 if(!teaching)return;const name=lesson[teachIndex].target[0];
 if(window.KOKORO_CLIPS?.[name])say(name,()=>namedAnimalCall(name));
 else{
  stop();
  if(!quiet&&!document.hidden&&window.KidsVoice&&window.KidsVoice.Utterance){
   const ticket=voiceTicket;const utterance=new window.KidsVoice.Utterance(name+'!');
   const voices=window.KidsVoice.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
   const friendly=voices.find(v=>/Aria|Jenny|Samantha|Google US English|Sonia|Karen/i.test(v.name))||voices.find(v=>/Natural|Neural|Online/i.test(v.name))||voices.find(v=>v.default)||voices[0];
   if(friendly)utterance.voice=friendly;
   utterance.lang=friendly?.lang||'en-US';utterance.rate=.96;utterance.pitch=1.18;sound.duck(true);
   utterance.onend=()=>{if(ticket===voiceTicket){sound.duck(false);namedAnimalCall(name)}};
   utterance.onerror=()=>{if(ticket===voiceTicket){audioNotice();namedAnimalCall(name)}};
   window.KidsVoice.speak(utterance);
  }else if(!quiet){audioNotice();namedAnimalCall(name)}
 }
 scheduleTeaching();
}

function teachingAnimal(name){
 const coat={cat:'#f5bd68',dog:'#e9bd85',cow:'#fffcf4',sheep:'#fffdf3',pig:'#f3a9bd',duck:'#f5df8b'}[name]||'#e9bd85';
 const bird=name==='duck';
 const legs=(bird?[80,135]:[58,83,137,158]).map((x,i)=>'<g class="walk-leg leg-'+i+'"><path d="M'+x+' 112v39h17" fill="none" stroke="'+(bird?'#e8a547':coat)+'" stroke-width="13" stroke-linecap="round"/></g>').join('');
 return '<svg class="full-animal" viewBox="0 0 240 180" aria-hidden="true"><ellipse cx="117" cy="163" rx="87" ry="7" fill="#466c5220"/>'+legs+'<path class="walk-tail" d="M48 91Q10 84 22 48" fill="none" stroke="'+coat+'" stroke-width="13" stroke-linecap="round"/><ellipse cx="105" cy="100" rx="69" ry="39" fill="'+coat+'" stroke="#735d6520" stroke-width="2"/>'+(name==='cow'?'<path d="M72 66q40 2 30 33t-39 6zM133 90q25-13 28 14t-23 20z" fill="#777180"/>':name==='sheep'?'<g fill="#fffdf3"><circle cx="57" cy="89" r="22"/><circle cx="82" cy="69" r="22"/><circle cx="110" cy="66" r="22"/><circle cx="139" cy="77" r="22"/></g>':name==='cat'?'<path d="m78 65 5 19m15-21 5 18" stroke="#d99544" stroke-width="7" stroke-linecap="round"/>':'')+'<g transform="translate(122 8) scale(.65)">'+window.KIDS_ART[name]+'</g></svg>';
}
function teachingPlacement(){
 const n=target[0];
 if(kind==='animals')return 'ground-animal';
 if(kind==='fruit')return ['apple','pear','orange','grapes'].includes(n)?'hanging-fruit':'picnic-fruit';
 if(['cloud','sun','moon'].includes(n))return 'sky-friend';
 if(n==='mountain')return 'distant-friend';
 if(kind==='colours'||kind==='shapes')return 'garden-sign';
 return 'ground-object';
}

function showTeaching(){
 stop();const entry=lesson[teachIndex];kind=entry.kind;target=entry.target;

 const placement=teachingPlacement();
 const vine=placement==='hanging-fruit'?'<svg class="teaching-vine" viewBox="0 0 200 160" aria-hidden="true"><path d="M180 156V28M20 35h170M40 37q30 35 66 0t62 0" fill="none" stroke="#986846" stroke-width="10" stroke-linecap="round"/><path d="M80 38v55m40-55v65" stroke="#508b4c" stroke-width="5"/><g fill="#6cc47c"><ellipse cx="64" cy="42" rx="24" ry="11" transform="rotate(-25 64 42)"/><ellipse cx="125" cy="43" rx="26" ry="12" transform="rotate(25 125 43)"/></g></svg>':'';
 $('#gamebody').innerHTML=toolbar()+'<section class="teach-stage scene-teaching"><div class="teach-progress" aria-label="Learning '+(teachIndex+1)+' of '+lesson.length+'">'+lesson.map((_,i)=>'<span class="'+(i===teachIndex?'current':'')+'"></span>').join('')+'</div><div class="teach-caption"><h2>'+target[0]+'</h2><span aria-hidden="true">🔊</span></div><div class="teaching-landscape"><div class="teaching-world" aria-hidden="true"></div>'+vine+(placement==='picnic-fruit'?'<div class="picnic-mat" aria-hidden="true"></div>':'')+'<button class="teach-friend '+placement+'" id="teach-repeat" aria-label="Hear '+target[0]+' again"><span class="teach-art" aria-hidden="true">'+(kind==='animals'?teachingAnimal(target[0]):picture(target))+'</span></button></div><img class="teach-maya" src="peek-purple.png" alt="Maya"><div class="audio-status" role="status"></div></section>';

 $('#game').classList.add('is-teaching');$('.star-trail').hidden=true;
 $('#teach-repeat').onclick=repeatTeaching;
 // Let the entrance finish before naming the new friend.
 clearTimeout(teachTimer);teachTimer=setTimeout(()=>{if(teaching)repeatTeaching()},1000);
}

function cancelIntro(){
 introTicket++;clearTimeout(introTimer);
 if(introAudio){introAudio.pause();introAudio=null}
 if(intro)stop();intro=false;sound.song(false);$('#game').classList.remove('is-intro');
}
function startFindIntro(){
 cancelTeaching();stop();clearTimeout(advanceTimer);intro=true;const ticket=++introTicket;
 $('#gamebody').innerHTML=toolbar()+'<div class="celebration-scene" aria-hidden="true"></div><section class="find-intro"><span class="intro-wave" aria-hidden="true">👋</span><h2>Hey, little buddy!</h2><p>Welcome to Find</p><img src="peek-purple.png" alt="Maya welcomes you" class="intro-maya"><div class="intro-notes" aria-hidden="true">♪ ♫ ♪</div><button id="intro-skip" class="intro-skip" aria-label="Start teaching now">Let’s explore! →</button><div class="audio-status" role="status"></div></section>';
 $('#game').classList.add('is-intro');sound.song(true);
 let musicStarted=false;
 const go=()=>{if(!intro||ticket!==introTicket||!$('#game').open)return;cancelIntro();startTeaching()};
 $('#intro-skip').onclick=go;
 const jingle=()=>{
  if(!intro||ticket!==introTicket||musicStarted||document.hidden)return;musicStarted=true;clearTimeout(introTimer);stop();sound.song(true);$('#game').classList.add('intro-dancing');
  introAudio=new Audio('find-welcome-jingle.wav');introAudio.preload='auto';introAudio.volume=.8;introAudio.muted=quiet||!musicOn;
  introAudio.onended=go;introAudio.ontimeupdate=()=>{if(introAudio&&introAudio.currentTime>=5)go()};
  introAudio.onerror=()=>{const status=$('.audio-status');if(status)status.textContent='Let’s meet our friends!';clearTimeout(introTimer);introTimer=setTimeout(go,1500)};
  introTimer=setTimeout(go,12000);
  introAudio.play().then(()=>{if(intro&&ticket===introTicket){clearTimeout(introTimer);introTimer=setTimeout(go,5000)}}).catch(()=>{if(intro&&ticket===introTicket){clearTimeout(introTimer);introTimer=setTimeout(go,1500)}});
 };
 const welcome="Hey, little buddy! Welcome to Find! Let's meet some friends!";
 introTimer=setTimeout(jingle,9000);
 if(quiet){clearTimeout(introTimer);introTimer=setTimeout(jingle,1800)}
 else if(window.KOKORO_CLIPS?.[welcome])say(welcome,jingle);
 else if(window.KidsVoice&&window.KidsVoice.Utterance){
  const u=new window.KidsVoice.Utterance(welcome);
  const voices=window.KidsVoice.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
  const voice=voices.find(v=>/Aria|Jenny|Samantha|Google US English|Sonia|Karen/i.test(v.name))||voices.find(v=>/Natural|Neural|Online/i.test(v.name))||voices[0];
  if(voice)u.voice=voice;u.lang=voice?.lang||'en-US';u.rate=.94;u.pitch=1.15;
  u.onend=jingle;u.onerror=jingle;window.KidsVoice.speak(u);
 }else{clearTimeout(introTimer);introTimer=setTimeout(jingle,2500)}
}

function startTeaching(){cancelTeaching();clearTimeout(advanceTimer);makeLesson();teachIndex=0;teaching=true;showTeaching()}

function start(id){cancelTeaching();mixed=id==='find';mixedBag=[];anchor=null;collection=[];if(mixed)id='animals';if(!games.some(g=>g.id===id))return;kind=id;round=0;previous='';$('#game').dataset.world=mixed?'find':id;$('#game').setAttribute('aria-label',mixed?'Find':games.find(g=>g.id===id).title);$('#game').showModal();document.body.classList.add('playing');sound.start();sound.mute(quiet);sound.music(musicOn);if(mixed)startFindIntro();else renderRound()}
function renderRound(){if(mixed){kind=findPlan[round].kind}attempts=0;helped=false;clearTimeout(advanceTimer);stop();clearTimeout(partyTimer);clearTimeout(danceTimer);$('#game').classList.remove('celebrating');answered=false;counted=new Set();let pool=kind==='animals'||kind==='sounds'?animals:kind==='fruit'?fruits:kind==='colours'?colours:shapes;if(window.KIDS_OBJECTS?.[kind])pool=window.KIDS_OBJECTS[kind];if(kind==='count')pool=Array.from({length:[3,5,10][level]},(_,i)=>[String(i+1),String(i+1)]);target=mixed?findPlan[round].target:shuffle(pool.filter(x=>x[0]!==previous))[0];if(mixed&&round===0)anchor={kind,target};previous=target[0];const candidates=mixed?lesson.map(x=>x.target):pool;choices=shuffle([target,...shuffle(candidates.filter(x=>x[0]!==target[0])).slice(0,level+1)]);
$('#gamebody').innerHTML='<div class="play-scenery" aria-hidden="true"><span class="sun">☀</span><span class="cloud cloud-one">☁</span><span class="cloud cloud-two">☁</span><span class="hill"></span></div>'+toolbar()+'<section class="play-prompt"><div class="buddy-wrap"><span class="buddy-cape"></span><img class="play-buddy" src="peek-purple.png" alt="Maya, your playful learning friend"></div><div class="prompt-copy"><h2>'+visualPrompt()+'</h2><div class="audio-status" role="status"></div></div><button class="replay-voice" id="listen" aria-label="Listen to the question"><span aria-hidden="true">▶</span></button></section>'+(kind==='count'?'<div class="count-basket" aria-label="Tap each apple to count">'+Array.from({length:Number(target[0])},(_,i)=>'<button class="count-apple" data-count="'+i+'" aria-label="Count apple '+(i+1)+'"><span aria-hidden="true">🍎</span><b></b></button>').join('')+'</div>':'')+'<div class="play-choices choices-'+choices.length+(kind==='count'?' number-choices':'')+'">'+choices.map((x,i)=>'<button class="play-choice" data-choice="'+i+'" aria-label="'+x[0]+'" style="--card-hue:'+['#f8dce6','#e3d8fa','#def0db','#ffedbf'][i]+'"><span class="choice-art" aria-hidden="true">'+picture(x)+'</span>'+(kind==='count'?'':'<span class="choice-word">'+x[0]+'</span>')+'<span class="choice-tick" aria-hidden="true">★</span></button>').join('')+'</div><div class="play-footer"><div class="mission-strip" aria-label="Discoveries collected">🧺 Help Maya fill her basket</div><div class="play-feedback-wrap"><div class="play-feedback" role="status" aria-live="polite">Your turn!</div><button class="help-choice" data-help aria-label="Show me a clue">💡</button></div></div><div class="confetti" aria-hidden="true"></div>';
const basket=$('.mission-strip');if(basket&&collection.length)basket.innerHTML=collection.map(x=>'<span class="mission-item" aria-hidden="true">'+x+'</span>').join('');$('#listen').onclick=()=>listenPrompt();listenPrompt()}
function celebrate(){sound.win();$('#game').classList.add('celebrating');const layer=$('.confetti');if(layer)layer.innerHTML=Array.from({length:42},(_,i)=>'<i style="--x:'+(5+(i*37)%90)+'%;--delay:'+(i%7)*.06+'s;--turn:'+(i*43)+'deg;--colour:'+['#f34e64','#ffc83f','#55c99a','#9b75e7','#43bce4'][i%5]+'">'+(i%3===0?'★':'')+'</i>').join('');clearTimeout(partyTimer);partyTimer=setTimeout(()=>{const layer=$('.confetti');if(layer)layer.innerHTML='';$('#game').classList.remove('celebrating')},1900)}
function queueAdvance(){clearTimeout(advanceTimer);advanceTimer=setTimeout(()=>{if(!$('#game').open||!answered)return;if(document.hidden||currentAudio&&!currentAudio.ended&&!currentAudio.paused){queueAdvance();return}round++;round===5?finish():renderRound()},2200)}
function choose(i){if(teaching||answered||!Number.isInteger(i)||!choices[i])return;const picked=choices[i];if(picked[0]===target[0]){answered=true;window.KidsResearch?.record({type:'find',concept:kind+':'+target[0],independent:attempts===0&&!helped,revisit:mixed&&round===3});collection.push(picture(target));const basket=$('.mission-strip');if(basket){basket.innerHTML=collection.map(x=>'<span class="mission-item" aria-hidden="true">'+x+'</span>').join('');basket.classList.add('delivered')}const trail=$('.star-trail');if(trail){trail.setAttribute('aria-label',(round+1)+' of 5 discoveries');trail.innerHTML=Array.from({length:5},(_,n)=>'<span class="'+(n<=round?'earned':'')+'" aria-hidden="true">★</span>').join('')}document.querySelectorAll('[data-choice]').forEach(b=>{b.disabled=true;if(Number(b.dataset.choice)===i)b.classList.add('is-correct')});$('.play-feedback').innerHTML='You found it! <span aria-hidden="true">🌟</span>';celebrate();say(kind==='actions'?'Yes! '+target[2]:kind==='count'?(target[0]==='1'?'Yes! One apple. You counted it!':'Yes! '+target[0]+' apples. You counted them!'):'Yes! You found the '+target[0]+'!');queueAdvance()}else{attempts++;sound.pop();$('.play-feedback').textContent='Let’s look again';const button=document.querySelector('[data-choice="'+i+'"]');if(button)button.classList.add('try-soft');if(attempts>=2)hint();else say(kind==='count'?'Let’s count each apple together. Try again.':'Let’s look again. You can do it.')}}
function hint(){if(teaching||answered)return;helped=true;document.querySelectorAll('[data-choice]').forEach(b=>b.classList.toggle('gentle-hint',choices[Number(b.dataset.choice)][0]===target[0]));listenPrompt()}
function countApple(i){if(answered||kind!=='count'||!Number.isInteger(i)||i<0||i>=Number(target[0])||counted.has(i))return;counted.add(i);const b=document.querySelector('[data-count="'+i+'"]');b.classList.add('counted');b.querySelector('b').textContent=counted.size;b.setAttribute('aria-label','Apple counted: '+counted.size);sound.pop();say(cueNames[counted.size-1])}
function finish(){stop();completed++;explored.add(kind);$('#progress-text').textContent=completed+' little adventures completed · '+explored.size+' activities explored this visit.';const moves={objects:['☀️','Stretch up to the sky!'],actions:['👋','Give a little wave!'],outside:['🌳','Stretch tall like a tree!'],home:['👏','Clap and stretch!'],everyday:['☂️','Stretch your arms wide!'],learn:['👏','Clap and stretch!'],animals:['🐾','Move like an animal!'],sounds:['🐄','Make a silly sound!'],fruit:['🍌','Pretend to peel a banana!'],count:['👏','Clap three times!'],colours:['🌈','Find a colour nearby!'],shapes:['⭕','Draw a circle in the air!']};$('#gamebody').innerHTML='<div class="play-scenery" aria-hidden="true"><span class="sun">☀</span><span class="cloud cloud-one">☁</span><span class="hill"></span></div>'+toolbar()+'<section class="play-finish"><div class="finish-stars" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><img id="dance-buddy" src="peek-orange.png" alt="Your happy octopus friend"><h2>You did it!</h2><button class="dance-button" id="dance"><span aria-hidden="true">♫</span> Wiggle time!</button><p class="movement-cue"><span aria-hidden="true">'+moves[kind][0]+'</span> '+moves[kind][1]+'</p><div class="finish-actions"><button class="replay-game" id="again"><span aria-hidden="true">↻</span> Play again</button><button class="home-game" data-close><span aria-hidden="true">⌂</span> Playroom</button></div><div class="audio-status" role="status"></div></section><div class="confetti" aria-hidden="true"></div>';$('#again').onclick=()=>{if(kind==='learn'){window.KidsLearning.replay();return}round=0;collection=[];anchor=null;mixedBag=[];if(mixed)startTeaching();else renderRound()};$('#game').classList.add('is-finished');$('#gamebody').insertAdjacentHTML('afterbegin','<div class="celebration-scene" aria-hidden="true"><span class="party-cloud cloud-a"></span><span class="party-cloud cloud-b"></span><span class="party-cloud cloud-c"></span></div>');function wiggle(){clearTimeout(danceTimer);$('#dance-buddy').classList.add('dancing');$('#dance').innerHTML='<span aria-hidden="true">♫</span> Wiggle, wiggle!';celebrate();sound.dance(()=>{$('#dance-buddy')?.classList.remove('dancing');sound.endDance?.();const b=$('#dance');if(b)b.innerHTML='<span aria-hidden="true">↻</span> Wiggle again!'},()=>{$('#dance-buddy')?.classList.remove('dancing');const b=$('#dance');if(b)b.innerHTML='<span aria-hidden=\"true\">♫</span> Tap for the song!';})}$('#dance').onclick=wiggle;wiggle()}

function updateAudio(){if(introAudio)introAudio.muted=quiet||!musicOn;sound.mute(quiet);sound.music(musicOn);$('#sound').textContent=quiet?'Sound off':'Sound on';$('#sound').setAttribute('aria-pressed',String(!quiet));const b=$('[data-sound]');if(b){b.textContent=quiet?'🔇':'🔊';b.setAttribute('aria-label',quiet?'Turn sound on':'Turn sound off');b.setAttribute('aria-pressed',String(!quiet))}const m=$('[data-music]');if(m){m.textContent=musicOn?'♫':'♪̸';m.setAttribute('aria-label',musicOn?'Turn music off':'Turn music on');m.setAttribute('aria-pressed',String(musicOn))}$('#music-setting').checked=musicOn;if(quiet)stop()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.game)start(b.dataset.game);if(b.hasAttribute('data-help'))hint();if(b.dataset.choice!==undefined)choose(Number(b.dataset.choice));if(b.dataset.count!==undefined)countApple(Number(b.dataset.count));if(b.hasAttribute('data-close'))$('#game').close();if(b.hasAttribute('data-music')){musicOn=!musicOn;updateAudio()}if(b.hasAttribute('data-sound')){quiet=!quiet;updateAudio();if(!quiet&&intro){}else if(!quiet&&teaching)repeatTeaching();else if(!quiet&&round<5&&target&&!window.KidsLearning?.active()&&!window.KidsSpelling?.active()&&!window.KidsResearch?.active())listenPrompt()}});
$('#game').addEventListener('close',()=>{cancelTeaching();clearTimeout(advanceTimer);window.KidsLearning?.cancel();window.KidsSpelling?.cancel();stop();sound.close();clearTimeout(partyTimer);clearTimeout(danceTimer);document.body.classList.remove('playing');$('#game').classList.remove('celebrating','is-finished')});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(teachTimer);clearTimeout(introTimer);if(introAudio)introAudio.pause();stop();sound.close()}else if($('#game').open){sound.start();updateAudio();if(intro)startFindIntro();else if(teaching)repeatTeaching()}});
$('#sound').onclick=()=>{quiet=!quiet;updateAudio()};
$('#grownup').onclick=()=>{$('#settings').showModal();$('#level').value=String(level)};$('#settings-close').onclick=()=>$('#settings').close();$('#level').onchange=e=>{const value=Number(e.target.value);level=Number.isInteger(value)&&value>=0&&value<=2?value:0;$('#level-label').textContent=['First discoveries · 2 choices','Growing explorers · 3 choices','Ready for more · 4 choices'][level]};
$('#reduce').onchange=e=>document.body.classList.toggle('reduced',e.target.checked);$('#music-setting').onchange=e=>{musicOn=e.target.checked;updateAudio()};

window.KidsBridge={animalArt:teachingAnimal,start,say,stop,celebrate,toolbar,updateAudio,finish(){kind='learn';round=5;finish()},busy:()=>Boolean(currentAudio&&!currentAudio.ended&&!currentAudio.paused)};
})();