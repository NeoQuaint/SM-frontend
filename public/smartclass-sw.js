// Notifications only: do not cache billing, authentication, or learning pages.
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 const body=typeof data.body==='string'?data.body.slice(0,240):'A little adventure is waiting. Come explore with SmartClass.';
 event.waitUntil(self.registration.showNotification('SmartClass',{body,icon:'/smartclass-icon-192.png',tag:data.tag==='smartclass-test'?'smartclass-test':'smartclass-gentle-reminder',data:{url:'/kids'},renotify:false,actions:[{action:'settings',title:'Reminder settings'}]}));
});
self.addEventListener('notificationclick',event=>{event.notification.close();const target=new URL(event.action==='settings'?'/kids#grown-ups':'/kids',self.location.origin).href;event.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});const existing=windows.find(c=>new URL(c.url).pathname.startsWith('/kids'));if(existing){if(event.action==='settings')await existing.navigate(target);return existing.focus()}return self.clients.openWindow(target)})())});
