(()=>{'use strict';
const root=document.documentElement,viewport=window.visualViewport;let frame=0;
function update(){frame=0;if(viewport&&Math.abs(viewport.scale-1)>.05)return;const height=viewport?.height||window.innerHeight,top=viewport?.offsetTop||0;root.style.setProperty('--ari-view-height',height+'px');root.style.setProperty('--ari-view-top',top+'px');document.body.classList.toggle('keyboard-open',window.innerHeight-height>120)}
function schedule(){if(!frame)frame=requestAnimationFrame(update)}
viewport?.addEventListener('resize',schedule);viewport?.addEventListener('scroll',schedule);window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);update();
})();
