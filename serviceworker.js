const cacheName = "simtiva-v5-181-plusmanualv2";

const assets = [
	"/",
	"/index.html",
	"/manual.html",
	"/main.js",
	"/features.js",
	"/pharmacology.js",
	"/index.js",
	"/chartjs-plugin-crosshair.min.js",
	"/styles.css",
	"/styles-extra.css",
	"/css/fontawesome.min.css",
	"/css/solid.min.css",
	"/webfonts/fa-solid-900.woff2",
	"/chart.min.js",
	"/beep.mp3",
	"/beep-2.mp3",
	"/apple-touch-icon-180x180.png",
	"/fonts/BrandonText-Bold.otf",
	"/fonts/SourceSans3-Regular.otf.woff2",
	"/fonts/SourceSans3-Bold.otf.woff2",
	"/fonts/SourceSans3-It.otf.woff2",
	"/fonts/SourceSans3-BoldIt.otf.woff2",
	"/lz-string.js",
	"/iconintubation.png",
	"/preview.gif",
	"/preview2.gif",
	"/pwa.webp",
	"/offermoney.webp",
	"/users.webp"
]

self.addEventListener('activate', event => {
	console.log('now ready to handle fetches!');
	  event.waitUntil(
		caches.keys().then(function(cacheNames) {
			console.log(cacheNames);
			var promiseArr = cacheNames.map(function(item) {
				if (item !== cacheName) {
					// Delete that cached file
					console.log("deleted " + item);
					return caches.delete(item);
				}
			})
			return Promise.all(promiseArr);
		})
	); // end e.waitUntil
});

//old activate code
/*
self.addEventListener('activate', function(event) {
  console.log("activation. ready to handle fetches.");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
*/
//end old activate code

self.addEventListener("install", installEvent => {
	self.skipWaiting();
	console.log("installing...");
	installEvent.waitUntil(
		caches.open(cacheName).then(cache => {
			cache.addAll(assets)
		}))
})



//ref: https://web.dev/offline-cookbook/#network-falling-back-to-cache
//off for now, testing
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
*/


//alternative fetch: cache fallback to network from web.dev (cache first)
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});