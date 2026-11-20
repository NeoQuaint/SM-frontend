import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {missingBusinessFields,generateLegal} from '../scripts/generate-legal.mjs';
const base=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,base),'utf8');
const config=JSON.parse(await read('config/legal-business.json'));
const routes=JSON.parse(await read('vercel.json'));
const names=['terms','privacy','refunds','account-data','legal'];
test('incomplete legal identity blocks publishing before generating pages',async()=>{
 if(missingBusinessFields(config).length)await assert.rejects(generateLegal(),/cannot be published/);
 const sole={legalName:'Test Owner',legalStatus:'sole proprietor',businessAddress:'Test address',legalServiceAddress:'Test address',supportEmail:'owner@example.com',phone:'0123456789',privacyContact:'Test Owner'};
 assert.deepEqual(missingBusinessFields(sole),[]);
 assert(missingBusinessFields({...sole,legalStatus:'company'}).includes('registrationNumber'));
 assert(missingBusinessFields({...sole,supportEmail:'not an email'}).includes('valid supportEmail'));
});
test('policies are static, linked and routed before the catch-all',async()=>{
 await generateLegal({draft:true});
 const catchAll=routes.rewrites.findIndex(r=>r.source.startsWith('/(('));
 for(const name of names){
  const html=await read('public/'+name+'.html');
  assert(html.includes('<main id="main"'));assert(html.includes('Print / save PDF'));assert(html.includes('<title>'));assert(!html.includes('undefined'));assert(!html.includes('href="mailto:null'));
  assert.equal(html.includes('noindex,nofollow'),missingBusinessFields(config).length>0);
  const idx=routes.rewrites.findIndex(r=>r.source==='/'+name);assert(idx>=0&&idx<catchAll);assert.equal(routes.rewrites[idx].destination,'/'+name+'.html');
  for(const [,target]of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   if(target==='/'||target==='/kids')continue;
   await access(new URL('public'+target+(target.includes('.')?'':'.html'),base));
  }
  for(const [,anchor]of html.matchAll(/href="#([^"]+)"/g))assert(html.includes('id="'+anchor+'"'));
 }
 const sitemap=await read('public/sitemap.xml');for(const name of names)assert(sitemap.includes('https://www.smartclasss.com/'+name));
 for(const file of ['public/index.html','public/parent-account.js','public/kids-progress-dashboard.js','public/kids-membership-demo.js']){const source=await read(file);for(const name of ['terms','privacy'])assert(source.includes('href="/'+name+'"'),file+' missing '+name);}
});
test('policies distinguish previews, actual purchases and actual data handling',async()=>{
 const terms=await read('public/terms.html'),privacy=await read('public/privacy.html'),refunds=await read('public/refunds.html'),account=await read('public/account-data.html');
 assert(terms.includes('free preview'));assert(terms.includes('does not take payment'));assert(terms.includes('R59'));assert(terms.includes('R79'));assert(terms.includes('R129'));assert(terms.includes('Shapes'));
 assert.equal(config.firstPaymentGuaranteeDays,7);assert(refunds.includes('seven calendar days'));assert(refunds.includes('using the activities does not disqualify'));assert(refunds.includes('time')||refunds.includes('timely'));
 assert(privacy.includes('store: false'));assert(privacy.includes('not a guarantee of zero retention'));assert(privacy.includes('90 days'));assert(privacy.includes('seven days'));assert(privacy.includes('OpenAI'));assert(privacy.includes('Render'));
 assert(account.includes('not a separate permanent SmartClass account'));assert(account.includes('Other game data remains'));assert(account.includes('do not erase information held by payment providers'));
});
