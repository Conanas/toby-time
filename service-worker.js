const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/style.css',
  '/script.js',
  '/public/fullscreen.js',
  '/public/load-save.js',
  '/public/plus-minus-buttons.js',
  '/public/wake-lock.js',
  '/assets/start-beeps.wav',
  '/assets/images/52567661_2280357498845139_6340121114789806080_n.jpg',
  '/assets/images/119434969_754151932029884_2181244510018018777_n.png',
  '/assets/images/119632782_3463441620345538_4659639724357311078_n.jpg',
  '/assets/images/119889237_382589559403843_637469353409195833_n.jpg',
  '/assets/images/119964053_1674963059352080_7664914611416996619_n.jpg',
  '/assets/images/sky-boom-face.png',
  '/assets/images/toby-face.jpg',
  '/assets/images/toby-sleeping.jpg',
  '/assets/images/favicons/android-chrome-192x192.png',
  '/assets/images/favicons/android-chrome-512x512.png',
  '/assets/images/favicons/apple-touch-icon.png',
  '/assets/images/favicons/favicon-16x16-rounded.png',
  '/assets/images/favicons/favicon-16x16.png',
  '/assets/images/favicons/favicon-32x32.png',
  '/assets/images/favicons/favicon.ico'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});
