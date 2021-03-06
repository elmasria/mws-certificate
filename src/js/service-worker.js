 /* global caches */
 /* global fetch */


 (function() {
     'use strict';
     var cacheName = 'mws-certification-v1.0.1';
     var filesToCache = [
         '/',
         '/index.html',
         '/js/app.min.js',
         '/css/app.min.css',
     ];

     self.addEventListener('install', function(e) {
         console.log('[ServiceWorker] Install');
         e.waitUntil(
             caches.open(cacheName).then(function(cache) {
                 console.log('[ServiceWorker] Caching app shell');
                 return cache.addAll(filesToCache);
             })
         );
     });

     self.addEventListener('activate', function(e) {
         console.log('[ServiceWorker] Activate');
         e.waitUntil(
             caches.keys().then(function(keyList) {
                 return Promise.all(keyList.map(function(key) {
                     if (key !== cacheName) {
                         console.log('[ServiceWorker] Removing old cache', key);
                         return caches.delete(key);
                     }
                 }));
             })
         );
     });


     self.addEventListener('fetch', function(e) {
         console.log('[ServiceWorker] Fetch', e.request.url);
         e.respondWith(
             caches.match(e.request).then(function(response) {
                 return response || fetch(e.request);
             })
         );
     });

 })();
 