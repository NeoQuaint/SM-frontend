(()=>{
const button=document.getElementById('free-flow'),holder=button?.parentElement,KEY='smartclass-free-flow-note-v1';if(!button||!holder)return;
let noteTimer=null,hideTimer=null,cancelled=false,shown=false;try{shown=localStorage.getItem(KEY)==='seen'}catch{}
const dashboardReady=()=>!document.hidden&&!document.getElementById('kids-app')?.hasAttribute('inert')&&!document.body.classList.contains('ob-active')&&!document.querySelector('dialog[open]');
function dismiss(){cancelled=true;clearTimeout(noteTimer);clearTimeout(hideTimer);holder.querySelector('.ff-note')?.remove();button.removeAttribute('aria-describedby');observer.disconnect();try{localStorage.setItem(KEY,'seen')}catch{}}
button.addEventListener('click',()=>{dismiss();window.MountainQuest?.startFreeFlow()});
function show(){noteTimer=null;if(cancelled||shown||!dashboardReady())return;shown=true;holder.insertAdjacentHTML('beforeend','<aside class="ff-note" id="free-flow-note" role="note"><strong>Just watch & learn ✨</strong><p>Maya plays Mountain Picnic for little ones. No tapping needed!</p><button type="button" aria-label="Dismiss Free Flow introduction">Got it</button></aside>');button.setAttribute('aria-describedby','free-flow-note');holder.querySelector('.ff-note button').onclick=dismiss;try{localStorage.setItem(KEY,'seen')}catch{}observer.disconnect();hideTimer=setTimeout(dismiss,3000)}
function schedule(){if(cancelled||shown)return;if(!dashboardReady()){clearTimeout(noteTimer);noteTimer=null;return}if(!noteTimer)noteTimer=setTimeout(show,3000)}
const observer=new MutationObserver(schedule);if(!shown)observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['inert','class','open']});document.addEventListener('visibilitychange',schedule);schedule();
})();