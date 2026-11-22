/* Recorded clues and scenery for Maya's river adventure. */
(()=>{'use strict';
const clues={
fish:['Fish','I have fins and swim under the water! What am I?'],
boat:['Boat','I float on water and have a sail! People use me to travel on water!'],
frog:['Frog','I jump and say ribbit, ribbit!'],
turtle:['Turtle','I carry a shell on my back. It helps keep me protected!'],
lily:['Flower','I’m a beautiful pink flower, floating on a lily pad.'],
reeds:['Stems','I am a group of tall green stems at the water’s edge.'],
dragonfly:['Dragonfly','I am an insect! I have a long body and thin wings!'],
pebble:['Rock','I am a small, smooth river stone!'],
bridge:['Bridge','I stretch from one river bank to the other, helping people get across!'],
paddle:['Paddle','I have a wide handle and a wide, flat end! What am I?'],
shell:['Shell','I am an empty, curved shell on the bank!'],
ripple:['Ripple','I am a ring spreading across the water!'],
lifejacket:['Vest','I am a bright vest worn on the water! I help to save people from drowning!'],
tadpole:['Tadpole','I am a tiny swimmer with a tail who will grow into a frog.'],
waterfall:['Waterfall','I am water tumbling down over rocks!']};
const recording=name=>'voice/river-maya/'+name+'.mp3';
const svg=body=>'<svg class="mq-landscape mq-world-1 mq-river-landscape" viewBox="0 0 900 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+body+'</svg>';
function tree(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 170Q-20 70 0 0" fill="none" stroke="#9c7049" stroke-width="25"/><path d="M-115 60Q-105-90 15-70Q125-60 120 90Q70 25 40 120Q-5 25-35 115Q-50 25-115 60" fill="#39b961"/><g fill="none" stroke="#91e24b" stroke-width="12" stroke-linecap="round"><path d="M-75-5q-35 55-15 110M-30-25q-25 75-5 140M25-30q35 65 20 150M65-15q45 45 35 110"/></g></g>`}
function falls(){return '<g class="river-falls"><path d="M320 340 350 170 410 140 430 75 560 65 615 150 665 180 705 355Z" fill="#6e91a2"/><path d="m350 170 60-30 20-65 45 20-30 130-75 40Z" fill="#a3bbc0"/><path d="m560 65 55 85 50 30 40 175-70-55-50-145Z" fill="#527b91"/><path d="M340 170q70-50 115-15M580 160l75 40M330 300l88-30M605 285l83 30" fill="none" stroke="#c1d0b6" stroke-width="16" stroke-linecap="round"/><path d="M450 90h105l-8 100h-18l42 155H410l47-155h-18Z" fill="#37d9f6"/><path d="M463 92h24l-6 112-35 137h-22l37-146Z" fill="#e5ffff"/><path d="M515 92h23l-8 112 35 137h-23l-32-137Z" fill="#96f4ff"/><g class="river-fall-streaks" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-dasharray="18 30"><path d="M496 100v95l-10 140M520 215l18 120M462 220l-22 115"/></g><ellipse cx="490" cy="357" rx="142" ry="39" fill="#5be2f6"/><g class="river-foam" fill="#efffff"><ellipse cx="490" cy="345" rx="98" ry="20"/><circle cx="413" cy="335" r="18"/><circle cx="447" cy="326" r="24"/><circle cx="490" cy="333" r="26"/><circle cx="535" cy="327" r="24"/><circle cx="570" cy="341" r="18"/></g><path d="M357 365q130 45 270 0M390 391q100 25 190 0" stroke="#c3fbff" stroke-width="7" fill="none"/><g fill="#55c94f"><ellipse cx="417" cy="81" rx="44" ry="18"/><ellipse cx="570" cy="79" rx="42" ry="18"/><ellipse cx="342" cy="295" rx="42" ry="19"/><ellipse cx="674" cy="310" rx="40" ry="20"/></g></g>'}
function bridge(){return '<g class="river-bridge"><path d="M210 470Q450 335 705 470L705 492Q450 357 210 492Z" fill="#c58a4f" stroke="#805633" stroke-width="5"/><path d="M210 425Q450 290 705 425" fill="none" stroke="#fff0b7" stroke-width="13" stroke-linecap="round"/>'+[210,270,330,390,450,510,570,630,705].map((x,i)=>{const y=425-65*Math.sin(i/8*Math.PI);return `<path d="M${x} ${y}v48" stroke="#996136" stroke-width="10" stroke-linecap="round"/>`}).join('')+'<path d="M210 475Q450 340 705 475" fill="none" stroke="#f6cb84" stroke-width="7"/></g>'}
function props(stage,n,art){let out='';const item=(id,x,y,w,cls='')=>`<g transform="translate(${x} ${y})"><g class="river-prop river-${id} ${cls}"><svg width="${w}" height="${w}" viewBox="0 0 160 160">${art(id).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</svg></g></g>`;
if(n>0)out+=item('fish',480,465,55);
if(n>1&&stage===0)out+=item('boat',540,318,105);
if(n>2&&stage===0)out+=item('frog',335,437,61);
if(n>3)out+=item('turtle',290,505,65);
if(n>4&&stage===0)out+=item('lily',565,510,85);
if(n>5&&stage===1)out+=item('reeds',640,438,95);
if(n>6&&stage===1)out+=item('dragonfly',540,270,65);
if(n>7&&stage===1)out+=item('pebble',300,510,50);
if(n>9&&stage===1)out+=item('paddle',620,485,75);
if(n>10&&stage===2)out+=item('shell',330,520,55);
if(n>11&&stage===2)out+='<g class="river-ripples" fill="none" stroke="#d4ffff" stroke-width="4"><ellipse cx="575" cy="500" rx="25" ry="8"/><ellipse cx="575" cy="500" rx="45" ry="15"/><ellipse cx="575" cy="500" rx="65" ry="22"/></g>';
if(n>13&&stage===2)out+=item('tadpole',500,455,48);
return out}
function scene(stage,n,art){return svg('<defs><linearGradient id="river-sky" x2="0" y2="1"><stop stop-color="#78dcff"/><stop offset="1" stop-color="#dcffff"/></linearGradient><linearGradient id="river-water" x2=".3" y2="1"><stop stop-color="#22c5ee"/><stop offset="1" stop-color="#58e3e8"/></linearGradient></defs><rect width="900" height="650" fill="url(#river-sky)"/><circle cx="715" cy="85" r="39" fill="#ffda48"/><g class="mq-cloud" fill="#fff"><ellipse cx="230" cy="90" rx="75" ry="22"/><circle cx="212" cy="70" r="29"/><circle cx="251" cy="67" r="35"/></g><path d="M0 300Q170 100 360 270Q650 100 900 270V650H0Z" fill="#90dd4d"/><path d="M0 380Q220 250 430 350Q670 220 900 345V650H0Z" fill="#4bc769"/><path d="M530 260Q380 350 465 410Q570 460 430 650H900V310Q650 460 620 270Z" fill="url(#river-water)"/><path d="M0 650V545Q200 480 380 560L370 650Z" fill="#84dc45"/><path d="M100 650Q390 570 325 500T355 370" fill="none" stroke="#f7d899" stroke-width="60" stroke-linecap="round"/><g class="river-current" fill="none" stroke="#c4ffff" stroke-width="5" stroke-linecap="round"><path d="M570 420h45m40 100h55m-205 65h65m140 20h65M530 550h25"/></g>'+(stage===0?tree(220,210,1.3)+tree(800,190,1.1):stage===1?tree(100,170,1.2)+tree(820,210,1)+bridge():tree(120,225,1.3)+tree(820,240,1.1)+falls())+props(stage,n,art)+'<g fill="#ff82b5"><circle cx="230" cy="565" r="7"/><circle cx="280" cy="590" r="6"/><circle cx="770" cy="570" r="8"/></g>')}
const vest='<span class="mq-river-vest" role="img" aria-label="Maya wears a life jacket"><svg viewBox="0 0 100 90"><path d="M25 5 8 20 5 80Q25 92 45 80V12L35 5ZM75 5l17 15 3 60Q75 92 55 80V12l10-7Z" fill="#ff8b32" stroke="#d85b26" stroke-width="3"/><path d="M16 33h24m20 0h24M12 57h76" stroke="#fff266" stroke-width="9"/><rect x="43" y="51" width="14" height="13" rx="3" fill="#554674"/></svg></span>';
function crossing(){return svg('<rect width="900" height="650" fill="#88e4ff"/><circle cx="740" cy="90" r="40" fill="#ffda48"/><path d="M0 300Q220 150 480 290T900 270V650H0Z" fill="#80da4b"/><path d="M295 275Q390 320 275 450L210 650H730L660 420Q580 335 620 275Z" fill="#35d3ec"/><path d="M420 325h55m20 200h60m-190 60h85m95 30h50" stroke="#c6ffff" stroke-width="7" stroke-linecap="round"/>'+tree(120,230,.9)+tree(800,220,.8)+'<path d="M0 500 210 460v30L0 570M705 460l195 40v70l-195-80Z" fill="#f3d395"/>').replace('xMidYMid slice','none')}
window.RiverAdventure={clues,recording,scene,vest,bridge,falls,crossing};
})();
