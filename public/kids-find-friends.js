(()=>{
const bridge=window.KidsBridge,sound=window.KidsSound;
let friends=['cat','cow'],fruitRound=false;
const room=document.createElement('dialog');room.id='find-friends';room.setAttribute('aria-label','Help Maya find her friends');document.body.append(room);
let index=0,phase='meet',found=[],hiding=0,muted=false,music=true,clip=null,ticket=0,timer=null;
const $=s=>room.querySelector(s),art=n=>fruitArt(n)||bridge.animalArt(n),voice=t=>['grapes','apple'].includes(t)?'voice/find-'+t+'.mp3':window.KOKORO_CLIPS?.[t];

function fruitArt(n){
 if(n==='apple')return '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M101 58q-5-30 12-43" stroke="#866040" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M107 39q21-36 56-20-13 36-56 20" fill="#68bb78"/><path d="M100 66C36 26 7 92 35 151q27 56 65 28 42 28 68-28 30-67-22-92-23-11-46 7" fill="#f25d70" stroke="#d64660" stroke-width="5"/><path d="M57 82q-20 18-12 44" stroke="#ffa6a8" stroke-width="12" fill="none" stroke-linecap="round"/></svg>';
 if(n==='grapes')return '<svg viewBox="0 0 200 220" aria-hidden="true"><path d="M98 54q-7-32 12-43" stroke="#896244" stroke-width="9" fill="none"/><path d="M104 37q26-32 56-13-15 30-56 13" fill="#72bd78"/>'+[[65,71],[111,71],[144,98],[48,110],[94,111],[68,151],[116,151],[93,188]].map(([x,y],i)=>'<circle cx="'+x+'" cy="'+y+'" r="27" fill="'+(i%2?'#9b69cf':'#8053bb')+'" stroke="#7147a7" stroke-width="3"/><circle cx="'+(x-8)+'" cy="'+(y-9)+'" r="6" fill="#c6a5ed"/>').join('')+'</svg>';
 return '';
}
function startFruit(){stop();room.classList.remove('pf-dancing');fruitRound=true;friends=['grapes','apple'];index=0;found=[];meet()}

function stop(){sound.duck(false);ticket++;clearTimeout(timer);if(clip){clip.pause();clip.onended=null;clip.ontimeupdate=null;clip=null}}
function later(fn,ms){clearTimeout(timer);timer=setTimeout(()=>{if(room.open&&!document.hidden)fn()},ms)}
function audio(list,done){stop();const own=ticket;let at=0;function next(){if(own!==ticket||!room.open||document.hidden)return;const part=list[at++];if(!part){sound.duck(false);if(done)done();return}if(muted||!part.src){next();return}sound.duck(true);clip=new Audio(part.src);clip.volume=.8;let finished=false;const end=()=>{if(finished||own!==ticket)return;finished=true;clearTimeout(timer);clip.pause();next()};clip.onended=end;clip.onerror=end;if(part.limit)clip.ontimeupdate=()=>{if(clip.currentTime>=part.limit)end()};timer=setTimeout(end,(part.limit||9)*1000+500);clip.play().catch(end)}next()}
function call(n){return {src:fruitRound?null:'animal-sounds/'+n+'.mp3',limit:2.5}}
function prompt(){if(phase==='welcome'){welcome();return}const n=friends[index];if((phase==='hide'||phase==='choose'))audio([{src:voice('Can you find the '+n+'?')},call(n)]);else if(phase==='meet')audio([{src:voice(n)||voice(n[0].toUpperCase()+n.slice(1)+'.')},call(n)])}
function shell(){
 const n=friends[index],title=phase==='intro'?'Hey, little buddy!':phase==='meet'?'Meet '+n+'!':phase==='react'?'Hello, '+n+'!':phase==='hide'?'Where is '+n+'?':phase==='found'?'You found '+n+'!':phase==='choose'?'Where is '+n+'?':phase==='chosen'?'Yes! '+n+'!':'Friends together!';
 room.innerHTML='<header class="pf-bar"><button data-pf="home" aria-label="Back to playroom">⌂</button><div class="pf-progress" aria-label="'+found.length+' of 2 friends found">'+friends.map(x=>'<span class="'+(found.includes(x)?'pf-earned':'')+'" aria-hidden="true">★</span>').join('')+'</div><div class="pf-audio-tools"><button data-pf="music" aria-label="'+(music?'Turn music off':'Turn music on')+'">'+(music?'♫':'♪̸')+'</button><button data-pf="sound" aria-label="'+(muted?'Turn sound on':'Turn sound off')+'">'+(muted?'🔇':'🔊')+'</button></div></header><main><div class="pf-heading"><img src="peek-purple.png" alt="Maya"><div><small>Help Maya find her friends</small><h2>'+title+'</h2></div><button data-pf="listen" aria-label="Hear again">▶</button></div><div class="pf-landscape"><div class="pf-garden" aria-hidden="true"></div><div class="pf-actors"></div></div><div class="pf-found" aria-label="Friends you found">'+friends.map(x=>found.includes(x)?'<div class="pf-friend-card '+(phase==='found'&&x===friends[index]?'pf-new-friend':'')+'" aria-label="'+x+' found">'+art(x)+'<strong aria-label="'+x.toUpperCase()+'">'+x.toUpperCase().split('').map((letter,i)=>'<span aria-hidden="true" style="--letter-colour:'+['#eb6094','#8474d6','#36aa9c'][i%3]+'">'+letter+'</span>').join('')+'</strong></div>':'<div class="pf-friend-slot" aria-label="Friend still to find"><span aria-hidden="true">?</span></div>').join('')+'</div><p class="pf-hint" role="status"></p></main>';
 room.dataset.phase=phase;room.dataset.round=fruitRound?'fruit':'animals';
}
function meet(){stop();sound.start();sound.song(false);sound.music(music);sound.mute(muted);phase='meet';shell();$('.pf-actors').innerHTML='<button class="pf-animal pf-enter pf-'+friends[index]+'" data-pf="hello" aria-label="Say hello to '+friends[index]+'">'+art(friends[index])+'<span class="pf-tap" aria-hidden="true">👆</span></button>';$('.pf-hint').textContent='Tap your new friend';prompt()}
function hello(){if(phase!=='meet')return;phase='react';room.dataset.phase=phase;$('.pf-animal').classList.add('pf-respond');$('.pf-heading h2').textContent='Hello, '+friends[index]+'!';$('.pf-hint').textContent='Listen…';audio(fruitRound?[{src:voice(friends[index])}]:[call(friends[index])],()=>later(fruitRound?learnFruit:hide,600))}
function learnFruit(){found.push(friends[index]);if(index<friends.length-1){index++;meet()}else{index=0;choose()}}
function bush(i){const clue=i===hiding?(friends[index]==='cat'?'<path class="pf-clue" d="M106 60q65-52 35-64" fill="none" stroke="#f5bd68" stroke-width="13" stroke-linecap="round"/>':'<g class="pf-clue"><path d="M93 65 79 14l22 20 22-20 11 51" fill="#fffaf0"/><path d="m88 30 9 17 9-12 12 22" stroke="#777180" stroke-width="8" fill="none"/></g>'):'';
return '<button class="pf-bush pf-bush-'+i+'" data-pf-spot="'+i+'" aria-label="Look behind the '+(i===0?'left':'right')+' bush"><svg viewBox="0 0 200 150" aria-hidden="true">'+clue+'<path d="M19 133Q-4 98 31 81Q16 41 65 44Q87 12 119 46Q163 26 169 74Q207 88 183 132Z" fill="'+(i?'#65b783':'#80c58a')+'" stroke="#4e9b70" stroke-width="4"/><path d="M46 94q15-14 29 1m43-20q20-11 31 7" fill="none" stroke="#b5e5a8" stroke-width="7" stroke-linecap="round"/></svg></button>'}
function hide(){stop();phase='hide';hiding=Math.random()<.5?0:1;shell();$('.pf-actors').innerHTML=bush(0)+bush(1);$('.pf-hint').textContent='Listen. Look. Tap!';prompt()}
function spot(i){if(phase!=='hide')return;window.KidsProgress?.attempt('find','Remembering a hiding place',friends[index],i===hiding);if(i!==hiding){const b=$('[data-pf-spot="'+i+'"]');b.classList.remove('pf-rustle');void b.offsetWidth;b.classList.add('pf-rustle');$('.pf-hint').textContent='A little rustle… try the other bush!';prompt();return}
phase='found';found.push(friends[index]);shell();$('.pf-actors').innerHTML='<div class="pf-animal pf-reveal">'+art(friends[index])+'</div><div class="pf-confetti" aria-hidden="true">'+Array.from({length:24},(_,i)=>'<i style="--x:'+(i*43%100)+'%;--delay:'+(i%5)*.08+'s;--colour:'+['#f36c95','#ffc940','#7b9fe8','#76cd96'][i%4]+'">★</i>').join('')+'</div>';cheer();
audio([{src:voice('Yes! You found the '+friends[index]+'!')},call(friends[index])],()=>later(next,1000))}
function next(){if(index<friends.length-1){index++;meet()}else {index=0;choose()}}

function choose(){
 stop();phase='choose';shell();
 $('.pf-actors').innerHTML='';
 const options=Math.random()<.5?[...friends]:[...friends].reverse();
 $('.pf-found').innerHTML=options.map(n=>'<button class="pf-choice" data-pf-choice="'+n+'" aria-label="'+n+'">'+art(n)+'<strong aria-hidden="true"></strong></button>').join('');
 $('.pf-hint').textContent='Tap the friend you hear';prompt();
}
function cheer(){ $('.pf-hint').textContent='★ You found it! ★'; }
function selectFriend(n){
 if(phase!=='choose')return;window.KidsProgress?.attempt('find',fruitRound?'Fruit recognition':'Animal sound matching',friends[index],n===friends[index]);
 const button=$('[data-pf-choice="'+n+'"]');
 if(n!==friends[index]){button.classList.remove('pf-rustle');void button.offsetWidth;button.classList.add('pf-rustle');$('.pf-hint').textContent='Listen again. You can do it!';prompt();return}
 phase='chosen';room.dataset.phase=phase;
 room.querySelectorAll('[data-pf-choice]').forEach(b=>b.disabled=true);
 button.classList.add('pf-choice-correct');button.querySelector('strong').textContent=n.toUpperCase();
 $('.pf-heading h2').textContent='Yes! You found '+n+'!';cheer();
 $('.pf-found').insertAdjacentHTML('beforeend','<div class="pf-confetti" aria-hidden="true">'+Array.from({length:24},(_,i)=>'<i style="--x:'+(i*43%100)+'%;--delay:'+(i%5)*.08+'s;--colour:'+['#f36c95','#ffc940','#7b9fe8','#76cd96'][i%4]+'">★</i>').join('')+'</div>');
 audio([{src:voice('Yes! You found the '+n+'!')},call(n)],()=>later(nextChoice,1000));
}
function nextChoice(){if(index<friends.length-1){index++;choose()}else finish()}

function finish(){window.KidsProgress?.complete('find',fruitRound?'Fruit discovery':'Animal listening adventure');stop();phase='party';shell();$('.pf-actors').innerHTML='<div class="pf-party-maya"><img src="maya-celebrate.png" alt="Maya smiling and jumping with her friends"></div>';$('.pf-found').classList.add('pf-friends-dance');$('.pf-hint').innerHTML='<button data-pf="dance">♫ Dance again</button><button data-pf="again">↻ Find our friends again</button>';dance()}
function dance(){stop();sound.close();room.classList.add('pf-dancing');if(muted||!music){$('.pf-hint').setAttribute('aria-label','Both friends found');if(!fruitRound)later(startFruit,3500);return}clip=new Audio('kids-remix.mp3');clip.volume=.8;room.classList.add('pf-dancing');const done=()=>{room.classList.remove('pf-dancing');if(!fruitRound)startFruit()};clip.onended=done;if(!fruitRound)later(done,12000);clip.play().catch(()=>{if(!fruitRound)later(done,2500);else room.classList.remove('pf-dancing')})}

function welcome(){
 stop();phase='welcome';room.dataset.phase=phase;sound.song(false);sound.music(music);
 $('.pf-heading h2').textContent='Let’s find Maya’s friends!';
 $('.pf-hint').textContent='Listen…';
 audio([{src:'voice/find-maya-invite.mp3'}],()=>later(meet,450));
}
function intro(){
 stop();phase='intro';shell();sound.start();sound.song(true);sound.music(music);sound.mute(muted);
 $('.pf-actors').innerHTML='<div class="pf-welcome"><img src="peek-purple.png" alt="Maya waving"><p>Welcome to Find!</p><span aria-hidden="true">♪ ♫ ♪</span></div>';
 $('.pf-hint').innerHTML='<button data-pf="begin">Let’s find our friends! →</button>';
 if(music&&!muted)audio([{src:'find-welcome-jingle.wav',limit:5}],welcome);else later(welcome,2200);
}
function open(){bridge.stop();window.KidsLearning?.cancel();window.KidsSound.close();fruitRound=false;friends=['cat','cow'];index=0;found=[];muted=document.querySelector('#sound')?.getAttribute('aria-pressed')==='false';music=document.querySelector('#music-setting')?.checked!==false;room.showModal();document.body.classList.add('pf-open');intro()}
room.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.pfChoice){selectFriend(b.dataset.pfChoice);return}const action=b.dataset.pf;if(action==='home')room.close();if(action==='begin'&&phase==='intro')welcome();if(action==='music'){music=!music;b.textContent=music?'♫':'♪̸';b.setAttribute('aria-label',music?'Turn music off':'Turn music on');sound.music(music);if((phase==='party'||phase==='intro')&&clip)clip.muted=muted||!music;}if(action==='hello')hello();if(action==='listen')prompt();if(action==='again'){fruitRound=false;friends=['cat','cow'];index=0;found=[];room.classList.remove('pf-dancing');meet()}if(action==='dance')dance();if(action==='sound'){muted=!muted;sound.mute(muted);b.textContent=muted?'🔇':'🔊';b.setAttribute('aria-label',muted?'Turn sound on':'Turn sound off');if(phase==='party'||phase==='intro'){if(clip)clip.muted=muted||!music}else if(clip)clip.muted=muted;else if(!muted)prompt()}if(b.dataset.pfSpot!==undefined)spot(Number(b.dataset.pfSpot))});
room.addEventListener('close',()=>{stop();sound.close();sound.song(false);room.classList.remove('pf-dancing');document.body.classList.remove('pf-open')});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-path="find"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true);
document.addEventListener('visibilitychange',()=>{if(!room.open)return;if(document.hidden){stop();sound.close();room.classList.remove('pf-dancing')}else{if(phase!=='party'){sound.start();sound.song(phase==='intro');sound.music(music);sound.mute(muted)}if(phase==='party'&&!fruitRound)dance();else if(phase==='intro')intro();else if(phase==='welcome')welcome();else if(phase==='react'){if(fruitRound)learnFruit();else hide()}else if(phase==='found')next();else if(phase==='chosen')nextChoice();else if(phase==='meet'||phase==='hide'||phase==='choose')prompt()}});
window.FindFriends={open};
})();