(()=>{'use strict';
let state=null,busy=false,timer=null,returnPoll=0;
const names={explorer:'Little Explorer',smart:'Smart Start',academy:'Full Academy'};
const dialog=document.createElement('dialog');dialog.id='billing-dialog';dialog.setAttribute('aria-labelledby','billing-title');document.body.append(dialog);
const date=value=>value?new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Johannesburg'}).format(new Date(value)):'—';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setPlan(plan){window.SmartClassMembership?.setVerifiedPlan(plan||'preview');resumeActivity(plan)}
let resumeStarted=false;
function resumeActivity(plan){if(resumeStarted||!names[plan]||!location.pathname.startsWith('/kids')||new URLSearchParams(location.search).get('payment')!=='complete')return;resumeStarted=true;const url=new URL(location.href);url.searchParams.delete('payment');history.replaceState(null,'',url.pathname+url.search+url.hash);let saved;try{saved=JSON.parse(sessionStorage.getItem('sc-checkout-return'));sessionStorage.removeItem('sc-checkout-return')}catch{}if(!saved||Date.now()-saved.at>3600000||!window.SmartClassMembership?.hasCategory(saved.category))return;let attempts=0;const open=()=>{if(document.body.classList.contains('kids-is-loading')&&attempts++<100){setTimeout(open,100);return}const card=[...document.querySelectorAll('#cards [data-path]')].find(el=>el.dataset.path===saved.category);card?.click()};open()}

async function refresh(){
 const r=await fetch('/api/billing',{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000)});
 if(r.status===401){state=null;setPlan('preview');return null}
 const d=await r.json();if(!r.ok)throw Error(d.error||'Could not check your package.');state=d;setPlan(d.plan);return d;
}
function show(title,content){const plan=Object.keys(names).find(id=>names[id]===title),tone={explorer:'blue',smart:'purple',academy:'gold'};dialog.dataset.plan=plan||'';const badge=plan?(window.SmartClassMembership?.badge(plan,true)||'<span class="mp-badge '+tone[plan]+' mp-large" role="img" aria-label="'+names[plan]+' badge"><span>✓</span></span>'):'';dialog.innerHTML='<button class="billing-close" aria-label="Close billing">×</button><span class="billing-eyebrow">FOR GROWN-UPS</span><div class="billing-package-heading">'+badge+'<h2 id="billing-title">'+title+'</h2></div>'+content+'<button class="billing-contact" data-contact-us>Contact us</button><p class="billing-status" role="status"></p>';dialog.querySelector('.billing-close').onclick=()=>{if(!busy)dialog.close()};if(!dialog.open)dialog.showModal()}
function status(message){const el=dialog.querySelector('.billing-status');if(el)el.textContent=message}
function login(){show('Sign in to continue','<p>Your package will belong to your parent account.</p><button class="billing-primary" data-billing-login>Sign in</button>');dialog.querySelector('[data-billing-login]').onclick=()=>{dialog.close();window.ParentAccount?.open()}}
async function post(body){const r=await fetch('/api/billing',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-CSRF-Token':state.csrf},body:JSON.stringify(body),signal:AbortSignal.timeout(55000)}),d=await r.json();if(!r.ok)throw Error(d.error||'Please try again.');return d}
async function checkout(plan){
 if(!Object.hasOwn(names,plan)||busy)return;show(names[plan],'<p>Checking your account…</p>');
 try{if(!await refresh())return login();if(!state.configured){status(state.error||'Checkout is being connected. Please check back soon.');return}
 if(state.complimentary)return manage();
 if(state.checkoutEnabled===false){status('Checkout is not open yet. The payment test is available to the owner account only.');return}
 if(state.subscription&&state.subscription.status!=='cancelled'&&state.subscription.status!=='closed'&&(!state.subscription.pending||state.subscription.plan!==plan))return manage();
 const quote=state.quotes?.[plan];if(!quote)throw Error('Please refresh the page to review current pricing.');const sale=quote.initialAmount<quote.recurringAmount;
 show(names[plan],(sale?'<div class="mp-black-friday">BLACK FRIDAY · FULL ACADEMY</div>':'')+'<p class="billing-price">'+(sale?'<del>R129</del> ':'')+'R'+quote.initialAmount/100+'<small>'+(sale?' / first month':' / month')+'</small></p><p>'+(state.mode==='test'?'<strong>Test checkout. No real payment.</strong>':'Your first payment is taken today.')+'</p><p>First renewal: <strong>'+date(state.quoteRenewal)+'</strong> at <strong>R'+quote.recurringAmount/100+'</strong>, then R'+quote.recurringAmount/100+'/month. Cancel renewal in Grown-Ups; paid access lasts until its end date.</p><label class="billing-consent"><input type="checkbox" id="billing-consent"> I agree to R'+quote.initialAmount/100+' today and R'+quote.recurringAmount/100+'/month from '+date(state.quoteRenewal)+', until I cancel, and the <a href="/terms" target="_blank" rel="noopener">Terms &amp; cancellation policy</a>.</label><button class="billing-primary" data-billing-pay disabled>Continue to secure checkout</button><p class="billing-small">Card details are entered securely with Stitch. Seven-day money-back guarantee on your first website payment. Refund requests: <a href="mailto:billing@smartclassedu.com">billing@smartclassedu.com</a>.</p>');
 const checkbox=dialog.querySelector('#billing-consent'),button=dialog.querySelector('[data-billing-pay]');checkbox.onchange=()=>button.disabled=!checkbox.checked;
 button.onclick=async()=>{if(busy||!checkbox.checked)return;busy=true;button.disabled=true;status('Opening Stitch…');try{const d=await post({action:'checkout',plan,recurringConsent:true,quote});const u=new URL(d.url);if(u.origin!=='https://express.stitch.money')throw Error('Unexpected checkout address.');try{sessionStorage.setItem('sc-checkout-return',JSON.stringify({category:window.SmartClassMembership?.returnCategory()||null,at:Date.now()}))}catch{}location.assign(u.href)}catch(e){status(e.message);button.disabled=false}finally{busy=false}};
 }catch(e){status(e.message)}
}
async function manage(){
 show('Your subscription','<p>Checking your package…</p>');
 try{if(!await refresh())return login();const s=state.subscription;if(!s){show('Your subscription','<p>No subscription has been started.</p>');return}
 if(s.status==='complimentary'){show(names[s.plan],'<p>Your current package</p><p>Complimentary access · No payment or automatic renewal.</p>');return}
 show(names[s.plan]||'Your subscription','<p>'+(state.mode==='test'?'Test subscription · ':'')+(s.status==='cancelled'?'Renewal cancelled.':s.pending?'Payment not confirmed yet.':state.plan==='preview'?'No current paid access.':'Your current package')+'</p>'+(s.status==='active'&&s.nextRenewal?'<p>Your next payment is on <strong>'+date(new Date(Math.max(+new Date(s.nextRenewal),+new Date(s.accessUntil||0))))+'</strong>.</p>':s.accessUntil?'<p>Your access continues until <strong>'+date(s.accessUntil)+'</strong>.</p>':'')+(s.canCancel?'<button class="billing-secondary" data-billing-cancel>Cancel renewal</button>':''));
 dialog.querySelector('[data-billing-cancel]')?.addEventListener('click',()=>{show('Cancel renewal?','<p>No future subscription charges will be made after Stitch confirms cancellation.'+(s.accessUntil?' You keep access until '+date(s.accessUntil)+'.':'')+'</p><button class="billing-primary" data-confirm-cancel>Confirm cancellation</button>');dialog.querySelector('[data-confirm-cancel]').onclick=async()=>{if(busy)return;busy=true;status('Cancelling with Stitch…');try{await post({action:'cancel'});busy=false;await manage()}catch(e){status(e.message)}finally{busy=false}}});
 }catch(e){status(e.message)}
}
async function returned(){
 const el=document.getElementById('billing-return-status');if(!el)return;
 try{const d=await refresh();if(!d){el.textContent='Sign in to check your package.';return}if(d.plan!=='preview'){el.textContent=(d.mode==='test'?'Test payment confirmed. ':'Payment confirmed. ')+names[d.plan]+' is ready!';clearTimeout(timer);return}
 el.textContent='We’re waiting for payment confirmation. Returning from checkout does not mean you have been charged. You can safely return to the app.';
 if(returnPoll++<12)timer=setTimeout(returned,5000);
 }catch{el.textContent='We couldn’t check your payment yet. Please try checking again; don’t pay again.'}
}
dialog.addEventListener('cancel',e=>{if(busy)e.preventDefault()});
document.addEventListener('click',e=>{if(e.target.closest('[data-billing-manage]'))manage();if(e.target.closest('[data-billing-check]')){returnPoll=0;returned()}});
window.addEventListener('smartclass:parent-signed-in',()=>{refresh().catch(()=>{});returned()});window.addEventListener('smartclass:parent-signed-out',()=>{state=null;setPlan('preview')});
window.addEventListener('pageshow',()=>{refresh().catch(()=>setPlan('preview'));returned()});document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh().catch(()=>setPlan('preview'))});setInterval(()=>{if(!document.hidden)refresh().catch(()=>setPlan('preview'))},60000);
window.SmartClassBilling={checkout,manage,refresh};refresh().catch(()=>setPlan('preview'));returned();
})();
