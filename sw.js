const CACHE_NAME = 'bot-gestiones-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/lucide.min.js',
  '/js/app.js',
  '/assets/icon.svg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Obliga al nuevo Service Worker a instalarse inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {

  // Seguridad: No cachear peticiones a APIs externas (contienen datos sensibles / credenciales)
  const url = event.request.url;
  if (url.includes('generativelanguage.googleapis.com') ||
      url.includes('script.google.com') ||
      url.includes('script.googleusercontent.com') ||
      url.includes('docs.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Estrategia: Network First (Red primero, luego caché como respaldo para offline)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si hay respuesta válida de la red, clónala y guárdala en caché
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red (offline), busca en caché
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // El nuevo SW toma el control de las ventanas abiertas
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
