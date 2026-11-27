const {chromium}=require('C:/Users/NeoMa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('path'),assert=require('assert');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const state={configured:true,checkoutEnabled:true,plan:'preview',mode:'live',csrf:'test',quoteRenewal:'2026-12-27T00:00:00+02:00',quotes:{academy:{initialAmount:7900,recurringAmount:12900}},subscription:null};let submitted;
 await page.route('https://sale.test/**',async route=>{const url=new URL(route.request().url());
  if(url.pathname==='/api/package-offer')return route.fulfill({json:{offer:{available:true,limit:250}}});
  if(url.pathname==='/api/billing'){if(route.request().method()==='POST'){submitted=route.request().postDataJSON();return route.fulfill({status:409,json:{error:'Offer changed. Review the price again.'}})}return route.fulfill({json:state});}
  if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:'<html><head><link rel="stylesheet" href="kids-membership-demo.css"><link rel="stylesheet" href="kids-billing.css"><style>body{font-family:system-ui;background:#f7f3fc}</style></head><body><div id="kids-app"><main><div class="intro"></div><div id="cards"></div></main></div></body></html>'});
  return route.fulfill({path:path.join(process.cwd(),'public',url.pathname)});
 });
 await page.goto('https://sale.test');await page.addScriptTag({path:'public/kids-membership-demo.js'});await page.addScriptTag({path:'public/kids-billing.js'});
 await page.evaluate(()=>SmartClassMembership.packagesAfterSignup());await page.locator('.mp-black-friday').waitFor();
 assert.equal(await page.locator('.mp-plan .mp-black-friday').count(),1);assert((await page.locator('.mp-plan.gold').innerText()).includes('FIRST 250 PARENTS'));assert((await page.locator('.mp-plan.gold').innerText()).includes('Then R129/month'));
 await page.locator('.mp-plan.gold').scrollIntoViewIfNeeded();await page.screenshot({path:'../black-friday-mobile.png'});
 assert(await page.locator('#membership-demo').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
 await page.locator('[data-mp-plan=academy]').click();await page.locator('#billing-consent').waitFor();assert((await page.locator('.billing-price').innerText()).includes('R79'));assert((await page.locator('.billing-consent').innerText()).includes('R129/month'));assert(await page.locator('[data-billing-pay]').isDisabled());
 await page.screenshot({path:'../black-friday-checkout.png'});await page.locator('#billing-consent').check();await page.locator('[data-billing-pay]').click();await page.getByText('Offer changed. Review the price again.').waitFor();assert.deepEqual(submitted.quote,{initialAmount:7900,recurringAmount:12900});
 await page.locator('.billing-close').click();await page.setViewportSize({width:1280,height:900});await page.screenshot({path:'../black-friday-desktop.png'});assert.deepEqual(errors,[]);
 console.log('PASS: mobile/desktop ribbon, Full Academy only, renewal disclosure, explicit consent and server quote submission');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
