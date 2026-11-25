(()=>{
'use strict';
const DAY=86400000,OFFSET=7200000;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function weekEnd(now){const local=new Date(now+OFFSET);return Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate()-local.getUTCDay())-OFFSET}
function build(data,categories,tips,end){
 const start=end-7*DAY,events=data.events.filter(e=>e.at>=start&&e.at<end),time=data.time.filter(e=>e.at>=start&&e.at<end&&e.ms>0);
 const visited=[...new Set([...events,...time].map(e=>e.category))].filter(c=>categories[c]);
 const trials=events.filter(e=>e.kind==='attempt'&&typeof e.ok==='boolean'&&!e.assisted);
 const scores=Object.keys(categories).map(c=>{const a=trials.filter(e=>e.category===c);return {c,total:a.length,ok:a.filter(e=>e.ok).length,items:new Set(a.map(e=>e.item||e.skill)).size}});
 const strength=scores.filter(s=>s.total>=4&&s.ok/s.total>=.75&&s.items>=3).sort((a,b)=>b.ok-a.ok)[0];
 const groups=new Map();for(const e of trials.filter(e=>!e.ok)){const key=e.category+'|'+(e.item||e.skill);groups.set(key,{category:e.category,count:(groups.get(key)?.count||0)+1})}
 const need=[...groups.values()].filter(g=>g.count>=2).sort((a,b)=>b.count-a.count)[0];
 const next=need?.category||Object.keys(categories).find(c=>!visited.includes(c))||visited[0];
 return {start,end,name:data.name||'Your little explorer',visited,missing:Object.keys(categories).filter(c=>!visited.includes(c)),minutes:Math.round(time.reduce((n,t)=>n+t.ms,0)/60000),days:new Set([...events,...time].map(e=>Math.floor((e.at+OFFSET)/DAY))).size,completed:events.filter(e=>e.kind==='complete').length,
 strength:strength?categories[strength.c][1]+': '+strength.ok+' of '+strength.total+' recorded answers were correct.':visited.length?'Explored '+visited.length+' learning '+(visited.length===1?'category':'categories')+'. More answers will help reveal strengths.':'No activity recorded for this week yet.',
 practice:need?categories[need.category][1]+' had repeated retries. Try a little practice together.':'No repeated difficulties recorded. This does not yet tell us which skills are secure.',
 next:tips[next]||'Choose a favourite activity and explore together.'};
}
let context=null,dialog=null,focusBefore=null;
function mount(ctx){context=ctx;const {page,data}=ctx,host=page.querySelector('.pd-hero-art');if(!host)return;host.querySelector('.pd-weekly-envelope')?.remove();const button=document.createElement('button');button.className='pd-weekly-envelope';button.setAttribute('aria-label','Open weekly reports');button.innerHTML='<svg viewBox="0 0 80 60" aria-hidden="true"><rect x="3" y="5" width="74" height="50" rx="9" fill="#fff7de" stroke="#a276d6" stroke-width="3"/><path d="M6 10L40 34L74 10M6 51L29 30M74 51L51 30" fill="none" stroke="#a276d6" stroke-width="3"/><circle cx="64" cy="10" r="10" fill="#efb532"/><path d="m60 10 3 3 5-6" fill="none" stroke="white" stroke-width="2.5"/></svg><b>Weekly reports</b>';host.append(button);button.onclick=()=>open(false);
}
function report(){const {data,categories,tips,save}=context,end=weekEnd(Date.now());if(data.since>=end)return {...build(data,categories,tips,Date.now()+1),preview:true};data.weeklyReports ||= {};const key=String(end);if(!data.weeklyReports[key]){data.weeklyReports[key]=build(data,categories,tips,end);Object.keys(data.weeklyReports).sort((a,b)=>b-a).slice(12).forEach(k=>delete data.weeklyReports[k]);save()}return data.weeklyReports[key]}
function open(automatic){if(!context||context.page.hidden)return;const r=report(),{data,categories,save}=context;if(automatic&&(r.preview||data.weeklySeen===r.end||document.querySelector('dialog[open]')))return;
 if(!dialog){dialog=document.createElement('dialog');dialog.id='weekly-report';dialog.setAttribute('aria-labelledby','weekly-report-title');document.body.append(dialog);dialog.addEventListener('close',()=>focusBefore?.isConnected&&focusBefore.focus())}
 if(dialog.open)return;focusBefore=document.activeElement;
 const date=t=>new Intl.DateTimeFormat('en-ZA',{timeZone:'Africa/Johannesburg',day:'numeric',month:'short'}).format(t);
 const member=window.SmartClassMembership,locked=Object.keys(categories).filter(c=>member&&!member.hasCategory(c==='sing'?'singalong':c));
 dialog.innerHTML='<button class="wr-close" aria-label="Close weekly report">×</button><div class="wr-top"><img src="peek-purple-fast.webp" alt="Maya delivering your report"><span>'+(r.preview?'A LITTLE PREVIEW':'YOUR SUNDAY LETTER')+'</span><h2 id="weekly-report-title">'+escape(r.name)+'’s week</h2><p>'+date(r.start)+' – '+date(r.end-1)+'</p></div><div class="wr-stats"><span><b>'+r.days+'</b> active days</span><span><b>'+r.visited.length+'</b> categories</span><span><b>'+r.completed+'</b> completed</span></div><div class="wr-summary"><section><span>✦</span><div><h3>Bright spots</h3><p>'+escape(r.strength)+'</p></div></section><section><span>♡</span><div><h3>A helping hand</h3><p>'+escape(r.practice)+'</p></div></section><section><span>↗</span><div><h3>Try together</h3><p>'+escape(r.next)+'</p></div></section></div>'+(r.missing.length?'<details class="wr-unexplored"><summary>'+r.missing.length+' categories not explored this week</summary><p>'+r.missing.map(c=>escape(categories[c][1])).join(' · ')+'</p><small>Not explored does not mean avoided. Some activities may be outside your package.</small></details>':'')+(r.visited.length&&locked.length?'<div class="wr-upgrade"><p>'+r.visited.length+' categories explored this week. Curious about more?</p><button data-wr="packages">Explore packages →</button></div>':'')+'<button class="wr-details" data-wr="details">More details →</button><p class="wr-note">'+(r.preview?'Your first weekly letter will be ready on Sunday. ':'')+'Based on activity saved on this device. Recorded answers are not an assessment of development.</p>';
 dialog.querySelector('.wr-close').onclick=()=>dialog.close();dialog.querySelector('[data-wr=details]').onclick=()=>{dialog.close();context.details()};dialog.querySelector('[data-wr=packages]')?.addEventListener('click',()=>{dialog.close();window.SmartClassMembership?.packages()});dialog.showModal();if(!r.preview){data.weeklySeen=r.end;save()}
}
window.WeeklyReports={mount,showNew:()=>open(true),build,weekEnd};
})();
