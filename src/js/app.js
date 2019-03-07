/* global navigator */

(function() {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/service-worker-auto.js')
            .then(function() {
                console.log('Service Worker Registered');
            });
    }

})();
