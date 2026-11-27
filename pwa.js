'use strict';
if ('serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('./sw.js').catch(e=>console.warn('Offline setup failed',e));

if(navigator.standalone===true)document.documentElement.classList.add('ios-standalone');
