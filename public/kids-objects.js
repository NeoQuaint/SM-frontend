(()=>{
 const $=s=>document.querySelector(s), titles={outside:'Outside','home-objects':'At home',everyday:'Everyday things',actions:'Actions'};
 const card=(id,art,title,desc)=>'<button class="activity" data-path="'+id+'" style="--bg:#e6f3ed;--shadow:#c9dfd5"><div class="art" aria-hidden="true">'+art+'</div><h3>'+title+'</h3><p>'+desc+'</p><span class="arrow" aria-hidden="true">↗</span></button>';

 const shuffle=items=>{const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 window.KidsObjectsMenu=page=>{if(!['objects','actions'].includes(page))return false;
 $('.sectionline').innerHTML='<button class="path-back" data-path="home" aria-label="Back to playroom">⌂</button><h2>'+(page==='objects'?'Touch & discover':'Let’s move!')+'</h2><span id="level-label" hidden></span>';
 const rows=page==='objects'?shuffle(window.KIDS_OBJECTS.objects).slice(0,6):shuffle(window.KIDS_OBJECTS.actions);
 $('#cards').innerHTML='<div class="object-intro"><span aria-hidden="true">'+(page==='objects'?'✨':'👋')+'</span><button class="room-play" data-game="'+page+'">▶ Find it!</button>'+(page==='objects'?'<button class="room-shuffle" data-shuffle aria-label="Show more objects">↻</button>':'')+'</div>'+rows.map(([name,art,phrase],i)=>'<button class="activity object-card" data-object="'+name+'" data-phrase="'+(phrase||name+'.')+'" aria-label="Hear '+name+'" style="--bg:'+['#ffeb71','#bfece4','#ffd2df','#d8cafa','#c5e9ff','#ffe0ab'][i]+';--shadow:#d5cadf;--tilt:'+[-3,3,2,-2,-3,2][i]+'deg"><div class="art" aria-hidden="true">'+art+'</div><h3>'+name+'</h3><span class="arrow" aria-hidden="true">♪</span></button>').join('');
 return true;};
 document.addEventListener('click',e=>{if(e.target.closest('[data-shuffle]')){window.KidsBridge.stop();window.KidsObjectsMenu('objects')}});
 let popTimer=null;
 document.addEventListener('click',e=>{const b=e.target.closest('[data-object]');if(!b)return;window.KidsBridge.say(b.dataset.phrase||b.dataset.object+'.');document.querySelectorAll('.object-pop').forEach(x=>x.classList.remove('object-pop'));void b.offsetWidth;b.classList.add('object-pop');clearTimeout(popTimer);popTimer=setTimeout(()=>b.classList.remove('object-pop'),1500);document.querySelectorAll('[data-object]').forEach(x=>x.classList.toggle('object-selected',x===b));});
})();