const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('public/kids-mountain-quest.js','utf8');
const branch=source.slice(source.indexOf('function queueFlowAnswer(){'),source.indexOf(' if(!freeFlow',source.indexOf('function queueFlowAnswer(){')))+'}';
function setup(){let pending,delay,answers=[];const ctx={onboarding:{},onboardingHint:null,document:{hidden:false},room:{open:true},screen:'play',state:{step:0,solved:false},epoch:1,tasks:[['cat']],clearTimeout(){pending=null},setTimeout(fn,ms){pending=fn;delay=ms;return 1},answer(n){answers.push(n)}};vm.createContext(ctx);vm.runInContext(branch,ctx);ctx.queueFlowAnswer();return {ctx,answers,run:()=>pending?.(),delay};}
let t=setup();assert.equal(t.delay,5000);assert.equal(t.answers.length,0);t.run();assert.deepEqual(t.answers,['cat']);
for(const change of [c=>c.epoch++,c=>c.state.solved=true,c=>c.document.hidden=true,c=>c.room.open=false,c=>c.screen='travel',c=>c.onboarding=null]){t=setup();change(t.ctx);t.run();assert.equal(t.answers.length,0);}
console.log('PASS: five-second onboarding answer; no stale, duplicate, hidden or travel answers');
