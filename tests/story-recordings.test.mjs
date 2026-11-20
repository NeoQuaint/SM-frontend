import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../public/',import.meta.url),context={window:{}};
for(const file of ['story-books-v3.js','story-recordings.js'])vm.runInNewContext(await readFile(new URL(file,root),'utf8'),context);
test('each supplied recording covers its own complete story in chronological scene and sentence cues',async()=>{
 const {STORY_BOOKS:books,STORY_RECORDINGS:recordings}=context.window;
 assert.equal(Object.keys(recordings).length,6);
 for(const name of ['Maya','Suzy','Lily','Coco','Juppy','Friends']){
  const book=(name==='Friends'?books[5]:books.find(b=>b.friend===name)),recording=recordings[book.id];
  assert.equal(recording.src,'story-audio/'+name.toLowerCase()+'.mp3');
  assert((await stat(new URL(recording.src,root))).size>100000);
  assert.equal(recording.scenes.length,book.pages.length);
  assert.equal(recording.scenes[0].start,0);
  assert.equal(recording.scenes.at(-1).end,recording.duration);
  for(let i=0;i<recording.scenes.length;i++){
   const scene=recording.scenes[i];assert(scene.end>scene.start);
   if(i)assert.equal(scene.start,recording.scenes[i-1].end);
   let previous=scene.start;
   for(const cue of scene.captions){assert(cue.start>=previous&&cue.start<scene.end);previous=cue.start;}
   assert.equal(scene.captions.map(c=>c.text).join(' ').replace(/\s/g,''),book.pages[i].text.replace(/\s/g,''));
  }
 }
});
