(()=>{
const button=document.getElementById('free-flow'),holder=button?.parentElement,KEY='smartclass-free-flow-note-v2';if(!button||!holder)return;
let sawPackages=false;try{sawPackages=localStorage.getItem('smartclass-packages-seen')==='yes'}catch{}
let noteTimer=null,hideTimer=null,cancelled=false,shown=false;try{shown=localStorage.getItem(KEY)==='seen'}catch{}
const dashboardReady=()=>sawPackages&&!document.hidden&&!document.getElementById('kids-app')?.hasAttribute('inert')&&!document.body.classList.contains('ob-active')&&!document.body.classList.contains('kids-is-loading')&&!document.querySelector('dialog[open]');
function dismiss(){cancelled=true;clearTimeout(noteTimer);clearTimeout(hideTimer);holder.querySelector('.ff-note')?.remove();button.removeAttribute('aria-describedby');observer.disconnect();try{localStorage.setItem(KEY,'seen')}catch{}}
button.addEventListener('click',()=>{dismiss();window.MountainQuest?.startFreeFlow()});
function show(){noteTimer=null;if(cancelled||shown||!dashboardReady())return;shown=true;holder.insertAdjacentHTML('beforeend','<aside class="ff-note" id="free-flow-note" role="note"><strong>Hands-free. Auto play.</strong><p>Sit back and learn.</p><button type="button" aria-label="Dismiss Free Flow introduction">Got it</button></aside>');button.setAttribute('aria-describedby','free-flow-note');holder.querySelector('.ff-note button').onclick=dismiss;try{localStorage.setItem(KEY,'seen')}catch{}hideTimer=setTimeout(dismiss,3000)}
function schedule(){if(cancelled)return;if(document.querySelector('#membership-demo[open][data-view="plans"]')){sawPackages=true;try{localStorage.setItem('smartclass-packages-seen','yes')}catch{}}if(shown){if(!dashboardReady())dismiss();return}if(!dashboardReady()){clearTimeout(noteTimer);noteTimer=null;return}if(!noteTimer)noteTimer=setTimeout(show,3000)}
const observer=new MutationObserver(schedule);if(!shown)observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['inert','class','open','data-view']});document.addEventListener('visibilitychange',schedule);schedule();
})();
