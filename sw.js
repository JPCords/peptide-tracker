// Change this version string every deploy to force cache clear
const CACHE_VERSION = 'v' + Date.now();
const CACHE = 'peptide-tracker-' + CACHE_VERSION;

self.addEventListener('install', e => {
  // Skip waiting immediately — don't wait for old SW to die
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // Delete ALL caches unconditionally
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Always go to network — no caching at all
  // This ensures updates are instant
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request)
    )
  );
});
