(()=>{'use strict';
const KEY='smartclass-push-device-v1';let device=null,config=null,loading=null,busy=false,lastVisit=0,host=null;
try{device=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}
function save(value){device=value;try{value?localStorage.setItem(KEY,JSON.stringify(value)):localStorage.removeItem(KEY)}catch{}}
const supported=()=>('serviceWorker'in navigator)&&('PushManager'in window)&&('Notification'in window);
const homeScreen=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const iphone=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
async function settings(){if(loading)return loading;return loading=(async()=>{const r=await fetch('/api/push',{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(10000)});if(r.status===401){config={signedIn:false};return}if(!r.ok)throw Error('Reminders are temporarily unavailable.');config={signedIn:true,...await r.json()}})().finally(()=>{loading=null})}
async function post(body){const r=await fetch('/api/push',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',...(config?.csrf?{'X-CSRF-Token':config.csrf}:{})},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});const d=await r.json();if(!r.ok)throw Error(d.error||'Please try again.');return d}
function message(text){host?.querySelector('[data-push-status]')?.replaceChildren(document.createTextNode(text))}
function paint(){if(!host?.isConnected)return;const button=host.querySelector('[data-push-toggle]'),test=host.querySelector('[data-push-test]'),enabled=!!device&&!device.pendingOff;
 test.hidden=!enabled;button.disabled=busy;button.textContent=enabled?'Turn off':config?.signedIn===false?'Sign in to enable':'Turn on reminders';
 if(iphone()&&!homeScreen()&&!enabled){button.hidden=true;test.hidden=true;message('On iPhone or iPad, add SmartClass to your Home Screen, then open it there to enable reminders.');return}
 if(!supported()&&!enabled){button.hidden=true;test.hidden=true;message('This browser does not support phone reminders. Try SmartClass in a supported browser or installed app.');return}
 button.hidden=false;if(supported()&&Notification.permission==='denied'&&!enabled){button.disabled=true;message('Notifications are blocked. Allow them in your browser or phone settings first.');return}
 if(!config&&!enabled){button.disabled=true;message('Checking reminder settings…');return}
 if(config?.signedIn&&!config.configured&&!enabled){button.disabled=true;message('Reminders are being connected. Please check back soon.');return}
 message(enabled?'On for this device. You can turn reminders off anytime.':'Optional. Your child’s name and progress stay out of notifications.');
}
async function turnOff(){if(!device)return;const current={...device,pendingOff:true};save(current);paint();let removed=false;try{await post({action:'off',deviceId:current.deviceId,visitToken:current.visitToken});removed=true}catch{}try{const reg=await navigator.serviceWorker?.getRegistration('/');await (await reg?.pushManager.getSubscription())?.unsubscribe()}catch{}if(removed)save(null);paint();if(!removed)message('Notifications are stopped in this browser. Server cleanup will retry when you reconnect.')}
async function enable(){if(busy)return;if(device&&!device.pendingOff){busy=true;await turnOff();busy=false;paint();return}if(config?.signedIn===false){window.ParentAccount?.open();return}if(!config?.configured||!supported())return;
 // Request permission directly from the parent's click, especially important on iOS.
 try{localStorage.setItem('sc-push-storage-check','1');localStorage.removeItem('sc-push-storage-check')}catch{message('This browser cannot save reminder settings. Reminders stay off.');return}
 const permission=Notification.requestPermission();busy=true;paint();let sub;
 try{if(await permission!=='granted'){message('No problem. Reminders stay off.');return}
  const reg=await navigator.serviceWorker.register('/smartclass-sw.js',{scope:'/'});await navigator.serviceWorker.ready;
  sub=await reg.pushManager.getSubscription();
  if(!sub){const raw=atob(config.publicKey.replace(/-/g,'+').replace(/_/g,'/'));sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:Uint8Array.from(raw,c=>c.charCodeAt(0))})}
  const d=await post({action:'subscribe',consent:true,subscription:sub.toJSON()});save({deviceId:d.deviceId,visitToken:d.visitToken});lastVisit=Date.now();
 }catch(e){if(sub&&!device)try{await sub.unsubscribe()}catch{}message(e.message||'Could not enable reminders. Please try again.');return}finally{busy=false;if(device)paint();else{const b=host?.querySelector('[data-push-toggle]');if(b)b.disabled=false}}
 paint();
}
async function visit(){if(!device||document.hidden)return;if(device.pendingOff){await turnOff();return}if(supported()&&Notification.permission!=='granted'){await turnOff();return}if(Date.now()-lastVisit<1800000)return;lastVisit=Date.now();try{const d=await post({action:'visit',deviceId:device.deviceId,visitToken:device.visitToken});if(!d.enabled){save(null);paint()}}catch{lastVisit=0}}
function mount(page){host=page.querySelector('#push-preferences');if(!host){host=document.createElement('section');host.id='push-preferences';host.className='push-preferences';host.innerHTML='<div class="push-heading"><img src="/smartclass-icon-192.png" alt=""><div><h2>Notifications</h2><p>Gentle reminders for your next adventure.</p></div></div><p class="push-detail">After 3 days away · At most once a week · We pause after two until you return.</p><div class="push-buttons"><button data-push-toggle>Turn on reminders</button><button data-push-test hidden>Send a test</button></div><p data-push-status role="status"></p><small>Sent around 4 pm South African time. <a href="/privacy#notifications">About reminders</a></small>';(page.querySelector('#settings-notifications')||page).append(host);host.querySelector('[data-push-toggle]').onclick=enable;host.querySelector('[data-push-test]').onclick=async()=>{if(busy||!device)return;busy=true;paint();try{await settings();if(!config?.signedIn){window.ParentAccount?.open();return}await post({action:'test',deviceId:device.deviceId});message('Test sent. Check your phone’s notifications.')}catch(e){message(e.message)}finally{busy=false;const b=host?.querySelector('[data-push-toggle]');if(b)b.disabled=false}}}
 paint();settings().then(paint).catch(e=>message(e.message));}
window.SmartClassPush={mount};window.addEventListener('smartclass:parent-signed-in',()=>{settings().then(paint).catch(()=>{});visit()});window.addEventListener('smartclass:parent-signed-out',()=>{config={signedIn:false};turnOff()});document.addEventListener('visibilitychange',visit);window.addEventListener('online',visit);setInterval(visit,1800000);visit();
})();
