const nombreCache = 'apv-v5';

const archivos = [
    '/47-ServiceWorkers-PWA/',
    '/47-ServiceWorkers-PWA/index.html',
    '/47-ServiceWorkers-PWA/error.html',
    '/47-ServiceWorkers-PWA/css/bootstrap.css',
    '/47-ServiceWorkers-PWA/css/styles.css',
    '/47-ServiceWorkers-PWA/js/app.js',
    '/47-ServiceWorkers-PWA/js/apv.js',
    '/47-ServiceWorkers-PWA/manifest.json',
  ];

// Instalar Service Worker
self.addEventListener('install', e =>{
    console.log('Instalado el service worker');

    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheanding...');
                cache.addAll(archivos);
            })
    )
});

// Activar Service Worker
self.addEventListener('activate', e => {
    console.log('Server Worker activado');

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache).map(key => caches.delete(key))
                )
            })
    )
});

// Evento Fetch para descargar archivos estaticos

self.addEventListener('fetch', e => {
    console.log('Fetch...', e);

    e.respondWith(
        caches.match(e.request)
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))
    )
});
