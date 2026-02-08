const CACHE_NAME = 'sparky-hq-v29';
const PRECACHE = [
    '/',
    '/css/style.css?v=13',
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
    '/tools/ohms-law/',
    '/tools/conduit-bending/',
    '/tools/power-converter/',
    '/tools/formula-sheet/',
    '/tools/transformer-sizing/',
    '/tools/ampacity-derating/',
    '/tools/lighting-load/',
    '/tools/service-entrance/',
    '/tables/',
    '/tables/motor-fla/',
    '/tables/ampacity/',
    '/tables/overcurrent/',
    '/tables/raceway-fill/',
    '/tables/egc-sizing/',
    '/tables/gec-sizing/',
    '/tables/torque-specs/',
    '/tables/conductor-properties/',
    '/tables/conduit-bending/'
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
    const url = new URL(e.request.url);

    // Network-first for HTML pages (navigation + same-origin page requests)
    // This ensures users always get the latest content on refresh
    const isPage = e.request.mode === 'navigate' ||
        (e.request.headers.get('accept') || '').includes('text/html');

    if (isPage && url.origin === self.location.origin) {
        e.respondWith(
            fetch(e.request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    // Cache-first for static assets (CSS, JS, images) — fast offline support
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
