/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const CACHE_NAME = 'cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1';

const URLS = ['/', './index.html', './main.css', './bundle.js'];

self.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(URLS);
  } catch (err) {
    return null;
  }
});

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener('fetch', (event) => {
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
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    console.error('No internet connection', error);
  }
}
