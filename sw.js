const PREFIX='routine-shell-';
const CACHE=PREFIX+'010-dev4';
const FILES=['./index.html','./activation.js','./script.enc.json?v=010-dev4','./pwa.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const urls=FILES.map(p=>new URL(p,self.registration.scope).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(urls.map(u=>new Request(u,{cache:'reload'})));})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url),scope=new URL(self.registration.scope);if(u.origin!==scope.origin)return;const navigation=e.request.mode==='navigate'&&(u.pathname===scope.pathname||u.pathname===new URL('index.html',scope).pathname);if(!navigation&&!urls.includes(u.href))return;e.respondWith((async()=>{const c=await caches.open(CACHE);const key=navigation?new URL('index.html',scope).href:u.href;return (await c.match(key))||fetch(e.request);})());});
