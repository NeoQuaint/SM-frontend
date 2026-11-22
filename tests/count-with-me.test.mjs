import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const base=new URL('../public/',import.meta.url),c={window:{}};
for(const f of ['count-with-me-lyrics.js','count-with-me-timing.js'])vm.runInNewContext(await readFile(new URL(f,base),'utf8'),c);
test('new sing-along covers supplied lyrics and all twenty numbers',async()=>{
 const pages=c.window.COUNT_LYRICS[0].pages,r=c.window.COUNT_RECORDINGS['count-with-me'];
 assert.equal(r.src,'count-with-me.mp3');assert.equal(pages.length,39);assert.equal(r.scenes.length,pages.length);
 assert.equal(r.scenes[0].start,0);assert.equal(r.scenes.at(-1).end,r.duration);
 for(let i=0;i<pages.length;i++){const cue=r.scenes[i];assert(cue.end>cue.start);if(i)assert.equal(cue.start,r.scenes[i-1].end);assert.equal(cue.captions.map(x=>x.text).join(' ').replace(/\s/g,''),pages[i].text.replace(/\s/g,''));}
 const numbers=[...new Set(pages.flatMap(p=>p.numbers))].sort((a,b)=>a-b);
 assert.deepEqual(numbers,Array.from({length:20},(_,i)=>i+1));
 for(const n of numbers)assert((await stat(new URL('numbers-song/number-'+n+'.png',base))).size>1000);
});
test('Numbers lesson retains its existing song and audio bytes',async()=>{
 const old=await readFile(new URL('numbers-remix.mp3',base));
 assert.equal(createHash('sha256').update(old).digest('hex'),'94132000bc6682a1ef56fec0f83982891372154cc2d38cda9dfc7f7eda01897f');
 const lesson=await readFile(new URL('kids-coco-twenty.js',base),'utf8');
 assert(lesson.includes("new Audio('numbers-remix.mp3')"));assert(!lesson.includes('count-with-me.mp3'));
});
