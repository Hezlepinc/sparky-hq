const CACHE_NAME = 'sparky-hq-v9';
const PRECACHE = [
    '/',
    '/css/style.css?v=11',
    '/js/app.js',
    '/js/validate.js',
    '/assets/logo.png',
    '/tools/',
    '/about.html',
    '/terms.html',
    '/tools/voltage-drop/',
    '/tools/wire-size/',
    '/tools/conduit-fill/',
    '/tools/box-fill/',
    '/tools/residential-load/',
    '/tools/generator-sizing/',
    '/tools/ohms-law/'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cached) => {
            const fetched = fetch(e.request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);
            return cached || fetched;
        })
    );
});
