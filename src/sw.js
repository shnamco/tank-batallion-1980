/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const CACHE_NAME = 'cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1';

const URLS = ['/', './index.html', './main.css', './offline.html', './bundle.js'];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(URLS);

  console.log('Service worker has been installed');
});

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name))
  );

  console.log('Service worker has been activated');
});

self.addEventListener('fetch', (event) => {
  console.log(`Trying to fetch ${event.request.url}`);
  event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    return caches.match('./offline.html');
  }
}
