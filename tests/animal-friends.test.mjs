import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import vm from 'node:vm';
const base=new URL('../public/',import.meta.url),c={window:{}};
for(const f of ['animal-friends-lyrics.js','animal-friends-timing.js'])vm.runInNewContext(await readFile(new URL(f,base),'utf8'),c);
test('Animal Friends covers all supplied lyrics and twelve full-body animals',async()=>{
 const pages=c.window.ANIMAL_LYRICS[0].pages,r=c.window.ANIMAL_RECORDINGS['animal-friends'];
 assert.equal(r.src,'animal-friends.mp3');assert.equal(pages.length,48);assert.equal(r.scenes.length,pages.length);
 assert.equal(r.scenes[0].start,0);assert.equal(r.scenes.at(-1).end,r.duration);
 for(let i=0;i<pages.length;i++){const cue=r.scenes[i];assert(cue.end>cue.start);if(i)assert.equal(cue.start,r.scenes[i-1].end);assert.equal(cue.captions.map(x=>x.text).join(' ').replace(/\s/g,''),pages[i].text.replace(/\s/g,''));}
 const animals=[...new Set(pages.flatMap(p=>p.animals))];
 assert.deepEqual(animals.sort(),['bird','cat','cow','dog','duck','elephant','frog','lion','monkey','pig','sheep','snake']);
 for(const n of animals)assert((await stat(new URL('emoji-animals/'+n+'.webp',base))).size>1000);
 assert((await stat(new URL(r.src,base))).size>1000000);
});
