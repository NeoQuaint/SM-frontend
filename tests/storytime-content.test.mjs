import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import vm from 'node:vm';
const publicRoot=new URL('../public/',import.meta.url);
const context={window:{}};
vm.runInNewContext(await readFile(new URL('story-books-v3.js',publicRoot),'utf8'),context);
const books=context.window.STORY_BOOKS;
test('six complete original story journeys with valid distinct scene artwork',async()=>{
assert.equal(books.length,6);assert.equal(new Set(books.map(b=>b.id)).size,6);
for(const book of books){assert.equal(book.pages.length,24);assert.equal(book.chapterTitles.length,6);let previous=-1;const frames=new Set();for(const p of book.pages){assert(p.text.length>50);assert(p.alt.length>20);assert(p.chapter>=previous);previous=p.chapter;const [x,y,w,h]=p.crop;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=1&&y+h<=1);assert(p.ratio>.5&&p.ratio<2);assert(p.holdMs>=1500);await access(new URL(p.sheet,publicRoot));frames.add(p.sheet+JSON.stringify(p.crop));}assert.equal(frames.size,24);for(let i=0;i<6;i++)assert.equal(book.pages.filter(p=>p.chapter===i).length,4);assert(book.cover.sheet);}
});

test('all 144 scenes have unique phone compositions',async()=>{
 const frames=new Set();
 for(const book of books)for(const p of book.pages){
  const a=p.portrait;assert(a);assert(a.ratio>.45&&a.ratio<.55);
  const [x,y,w,h]=a.crop;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=1&&y+h<=1);
  await access(new URL(a.sheet,publicRoot));frames.add(a.sheet+JSON.stringify(a.crop));
 }
 assert.equal(frames.size,144);
});
