(()=>{'use strict';
const KEY='smartclass-guided-welcome-v1';let active=false,stage='find',songTimer=null;
const panel=document.createElement('dialog');panel.id='guided-welcome';panel.setAttribute('aria-label','Your first SmartClass adventure');document.body.append(panel);
function remember(){try{localStorage.setItem(KEY,'done')}catch{}}
function show(body){panel.innerHTML='<main>'+body+'</main>';if(!panel.open)panel.showModal()}
function home(){remember();active=false;clearTimeout(songTimer);panel.close();document.body.classList.remove('ob-active');location.assign('/');}
function choice(){stage='choice';show('<img src="maya-juppy-hug.png" alt="Maya and Juppy hug"><div class="ob-finish-stars" aria-label="Five stars">★★★★★</div><h1>You did it!</h1><button data-ob="explore">Explore more games ♫</button><button data-ob="home" class="ob-secondary">Home ⌂</button>')}
function parents(){if(!active||stage!=='song')return;stage='parents';window.FamilySingAlong?.close();remember();show('<img src="maya-celebrate.png" alt="Maya celebrates"><h1>A lovely first adventure!</h1><p>Grown-ups, make it their own.</p><button data-ob="account">Create an account</button><button data-ob="packages" class="ob-secondary">Explore packages</button><button data-ob="playroom" class="ob-text">Keep exploring</button><small>Progress is saved on this device. Signing in is free; no payment is taken.</small>')}
function song(){stage='song';panel.close();window.FamilySingAlong.open();if(!document.getElementById('family-song')?.open){parents();return}const b=document.createElement('button');b.className='ob-song-next';b.textContent='Grown-ups →';b.onclick=parents;document.getElementById('family-song').append(b)}
function leave(){active=false;clearTimeout(songTimer);panel.close();window.FamilySingAlong?.close();document.querySelector('.ob-song-next')?.remove();document.body.classList.remove('ob-active');remember()}
panel.addEventListener('click',e=>{switch(e.target.closest('[data-ob]')?.dataset.ob){case'explore':song();break;case'home':home();break;case'playroom':leave();break;case'account':window.FamilySingAlong?.close();window.SmartClassMembership?.parentAccount();break;case'packages':window.FamilySingAlong?.close();window.SmartClassMembership?.packages();break}});panel.addEventListener('cancel',e=>{e.preventDefault();if(stage==='parents')leave();else home()});
window.addEventListener('smartclass:family-song-ended',()=>{if(active&&stage==='song')songTimer=setTimeout(parents,1200)});
document.getElementById('family-song')?.addEventListener('close',()=>{if(active&&stage==='song')parents()});
function begin(){let done=false;try{done=localStorage.getItem(KEY)==='done'}catch{}if(done)return;active=true;document.body.classList.add('ob-active');window.MountainQuest.startOnboarding({done:choice,exit:home})}
function ready(){if(document.body.classList.contains('kids-is-loading'))return;observer.disconnect();begin()}
const observer=new MutationObserver(ready);observer.observe(document.body,{attributes:true,attributeFilter:['class']});ready();
})();