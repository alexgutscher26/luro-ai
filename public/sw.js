const STATIC_CACHE = "luro-static-v1";
const DYNAMIC_CACHE = "luro-dynamic-v1";

// Assets to cache immediately
const STATIC_ASSETS = [
    "/",
    "/app",
    "/auth/signin",
    "/auth/signup",
    "/images/logo.png",
    "/images/logo-dark.png",
    "/fonts/Satoshi-Variable.woff2",
    "/fonts/Switzer-Variable.woff2",
];

// Install event - cache static assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then(cache => {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return (
                                cacheName !== STATIC_CACHE &&
                                cacheName !== DYNAMIC_CACHE
                            );
                        })
                        .map(cacheName => {
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") {
        return;
    }

    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }

    // Handle API requests with network-first strategy
    if (url.pathname.startsWith("/api/")) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone response for cache
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache
                    return caches.match(request);
                })
        );
        return;
    }

    // Handle static assets with cache-first strategy
    if (
        url.pathname.match(
            /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$/
        )
    ) {
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(response => {
                    const responseClone = response.clone();
                    caches.open(STATIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                });
            })
        );
        return;
    }

    // Handle page requests with stale-while-revalidate strategy
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(request).then(response => {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE).then(cache => {
                    cache.put(request, responseClone);
                });
                return response;
            });
        })
    );
});

// Background sync for offline actions
self.addEventListener("sync", event => {
    if (event.tag === "background-sync") {
        event.waitUntil(
            // Handle background sync logic here
            console.log("Background sync triggered")
        );
    }
});

// Push notifications
self.addEventListener("push", event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: "/images/icon.png",
            badge: "/images/icon.png",
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey,
            },
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});
