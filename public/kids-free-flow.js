(()=>{
const button=document.getElementById('free-flow'),holder=button?.parentElement,KEY='smartclass-free-flow-note-v1';if(!button||!holder)return;
function dismiss(){holder.querySelector('.ff-note')?.remove();button.removeAttribute('aria-describedby');try{localStorage.setItem(KEY,'seen')}catch{}}
button.addEventListener('click',()=>{dismiss();window.MountainQuest?.startFreeFlow()});
let shown=false;try{shown=localStorage.getItem(KEY)==='seen'}catch{}
function show(){if(shown||document.getElementById('kids-app')?.hasAttribute('inert'))return;shown=true;holder.insertAdjacentHTML('beforeend','<aside class="ff-note" id="free-flow-note" role="note"><strong>Just watch & learn ✨</strong><p>Maya plays Mountain Picnic for little ones. No tapping needed!</p><button type="button" aria-label="Dismiss Free Flow introduction">Got it</button></aside>');button.setAttribute('aria-describedby','free-flow-note');holder.querySelector('.ff-note button').onclick=dismiss;try{localStorage.setItem(KEY,'seen')}catch{}observer.disconnect()}
const observer=new MutationObserver(show);observer.observe(document.getElementById('kids-app'),{attributes:true,attributeFilter:['inert']});show();
})();
