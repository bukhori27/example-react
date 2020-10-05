self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
    
  workbox.setConfig({ debug: false });
  workbox.core.clientsClaim();
  
  // Cache content name
  workbox.core.setCacheNameDetails({
    prefix: 'example',
    suffix: 'v1'  
  });
  
  // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  );
  
  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
        }),
      ],
    }),
  ); 

  // Cache CDN files
  workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'cdn-cache'
    })    
  );  
  
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
    
  // workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/output.html"), {
      
  //   blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
  // });
    
  