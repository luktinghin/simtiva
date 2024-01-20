const cacheName = "vetsimtiva-v1-1";
const assets = [
	"/",
	"/index.html",
	"/main.js",
	"/chartjs-plugin-crosshair.min.js",
	"/styles.css",
	"/css/fontawesome.min.css",
	"/css/regular.min.css",
	"/css/brands.min.css",
	"/css/solid.min.css",
	"/webfonts/fa-solid-900.ttf",
	"/webfonts/fa-solid-900.woff2",
	"/webfonts/fa-regular-400.ttf",
	"/webfonts/fa-regular-400.woff2",
	"/chart.min.js",
	"/beep.mp3",
	"/beep-2.mp3",
	"/eleveld1.gif",
	"/eleveld2.gif",
	"/icon.png",
	"/apple-touch-icon-180x180.png",
	"/fonts/BrandonText-Bold.otf",
	"/fonts/SourceSans3-Regular.otf.woff2",
	"/fonts/SourceSans3-Bold.otf.woff2",
	"/fonts/SourceSans3-It.otf.woff2",
	"/fonts/SourceSans3-BoldIt.otf.woff2",
	"/lz-string.js"
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
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

