import {cp,mkdir,rm,readFile,writeFile} from 'node:fs/promises';
const output=new URL('../dist/',import.meta.url);
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp(new URL('../public/',import.meta.url),output,{recursive:true});
console.log('SmartClass Kids: static production build ready.');

// A shareable entry point reuses the live game and never requires an account.
const kids=await readFile(new URL('../public/kids.html',import.meta.url),'utf8');
const preview=kids.replace('<html lang="en">','<html lang="en" data-find-preview="true">')
.replaceAll('SmartClass Kids | Play, Learn and Explore (Ages 3-6)','Try Mountain Picnic | SmartClass')
.replaceAll('https://www.smartclasss.com/kids','https://www.smartclasss.com/try-find')
.replaceAll('Help your child learn to read, count, and explore with fun, interactive 3D games. The perfect school-readiness app for toddlers. Start your free trial today.','Play a free Mountain Picnic adventure with Maya. Five playful discoveries. No login or signup needed.');
await writeFile(new URL('try-find.html',output),preview);
