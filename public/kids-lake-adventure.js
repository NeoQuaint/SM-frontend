(()=>{'use strict';
const clues={
door:['LakeDoor','I have a handle! Open me and step inside Lily’s house!'],
key:['LakeKey','I’m small and fit inside a lock! Turn me… click!'],
window:['LakeWindow','Look through my glass! You can see the beautiful lake outside!'],
curtain:['LakeCurtain','I hang beside the window! Pull me closed when the sunshine gets too bright!'],
lamp:['LakeLamp','It’s a little dark in here! Switch me on and I’ll light up the room!'],
cushion:['LakeCushion','I’m soft and squishy! Put me on your seat to make it comfy!'],
clock:['LakeClock','Tick-tock, tick-tock! My hands tell you the time!'],
cup:['LakeCup','I have a handle and hold your drink! Sip, sip!'],
spoon:['LakeSpoon','Time for some yoghurt! Use me to scoop it up. I have a little bowl at the end!'],
plate:['LakePlate','I’m a flat, round dish! Let’s put our yummy sandwich on me!'],
bowl:['LakeBowl','I’m a deep, round dish! You can fill me with cereal and milk!'],
chair:['LakeChair','Come sit down! I have a seat and a back to help you sit comfortably!'],
blanket:['LakeBlanket','Brrr! Feeling chilly? Wrap me around you! I’m soft and keep you warm!'],
basket:['LakeBasket','Let’s pack our picnic! I have a handle and carry all our yummy snacks!'],
lantern:['LakeLantern','It’s getting dark! Carry me by my handle and I’ll light the way!']};
const recording=name=>'voice/lake-maya/'+name+'.mp3';
const checkpoints=['Yaaay! We’ve made five discoveries! Come along, let’s explore Lily’s cosy room!','Oh yeah! We’ve explored the cosy room! Now let’s head to the picnic corner!'];
const meet='Yeeeeey! There’s Lily! I’m so happy to see you! Come here, Lily, let’s have a big hug!';
function decorate(base,stage,n,art){
base=base.replace('viewBox="0 0 900 650"','viewBox="'+(stage===0?140:stage===1?85:0)+' 0 900 650"');
if(stage===2&&n>=14)base=base.replace('fill="#8de8ff"','fill="#b9b7ef"');
const item=(id,x,y,w)=>`<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="0 0 160 160" class="lake-found lake-${id}">${art(id).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</svg>`;
let add='';
if(stage===0){
 if(n>=1)add+='<rect x="610" y="236" width="72" height="136" rx="8" fill="none" stroke="#ffdf59" stroke-width="5"/>';
 if(n>=2)add+='<rect x="613" y="240" width="65" height="130" rx="7" fill="#594b7c"/><path class="lake-door-open" d="m613 240 27 15v101l-27 14Z" fill="#b690ec" stroke="#8765b7" stroke-width="3"/>';
 if(n>=3)add+='<path class="lake-glint" d="m517 238 20-8m-16 25 28-12" stroke="#fff" stroke-width="5" stroke-linecap="round"/>';
 if(n>=4)add+='<g class="lake-curtains"><path d="M508 227h28v62l-25-9ZM541 227h25v53l-25 9Z" fill="#e78fe0"/><path d="M509 225h59" stroke="#9d60a2" stroke-width="4"/></g>';
 if(n>=5)add+='<ellipse class="lake-lamp-glow" cx="540" cy="258" rx="37" ry="40" fill="#ffe881" opacity=".45"/>';
}
if(stage===1){
 add+='<ellipse class="lake-lamp-glow" cx="710" cy="155" rx="76" ry="90" fill="#ffe888" opacity=".35"/>';
 if(n>=6)add+=item('cushion',565,305,75);
 if(n>=7)add+='<g transform="translate(480 150)"><circle r="43" fill="#fff4c8" stroke="#b485e5" stroke-width="9"/><g class="lake-clock-hand"><path d="M0 0V-28" stroke="#65519a" stroke-width="5" stroke-linecap="round"/></g><path d="M0 0 20 10" stroke="#65519a" stroke-width="6" stroke-linecap="round"/><circle r="5" fill="#e48ac4"/></g>';
 add+='<path d="M400 477v73m245-73v73" stroke="#a97b55" stroke-width="15"/><ellipse cx="522" cy="470" rx="156" ry="37" fill="#ecc18c" stroke="#bd9262" stroke-width="5"/>';
 if(n>=8)add+=item('cup',442,406,63);
 if(n>=9)add+=item('spoon',557,427,55);
 if(n>=10)add+=item('plate',495,418,74);
}
if(stage===2){
 add+='<path d="M320 545v75m300-75v75" stroke="#a97c52" stroke-width="16"/><ellipse cx="470" cy="540" rx="180" ry="43" fill="#f0c589" stroke="#ac7b50" stroke-width="6"/><path d="M342 520h255v43H342Z" fill="#fff1cb"/>';
 if(n>=11)add+=item('bowl',438,476,75);
 if(n>=12)add+=item('chair',555,490,108);
 if(n>=13)add+='<g transform="translate(-75 0)"><path class="lake-found" d="M662 533q35-10 51 0v55l-51-7Z" fill="#ad8bea"/><path d="M672 539v39m13-41v43m13-41v42" stroke="#dbbaf6" stroke-width="5"/></g>';
 if(n>=14)add+=item('basket',302,551,92);
 if(n>=15)add+='<ellipse class="lake-lamp-glow" cx="580" cy="510" rx="55" ry="64" fill="#ffe77c" opacity=".3"/>'+item('lantern',555,465,60);
}
return base.replace('</svg>',add+'</svg>');
}
function carried(step,solved,art){return step===1&&solved?'<span class="mq-held-key" aria-label="Maya holds Lily’s key">'+art('key')+'</span>':step===14&&solved?'<span class="mq-lake-lantern" aria-label="Maya carries a glowing lantern">'+art('lantern')+'</span>':''}
window.LakeAdventure={clues,recording,checkpoints,meet,decorate,carried};
})();
