/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const CACHE_NAME = 'cache-v2';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v2';

const URLS = ['/index.html', '/main.css', '/offline.html', '/boundle.js'];
// const URLS = ['/', '/index.html', '/index.tsx', '/offline.html'];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(URLS);
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
  const { request } = event;

  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);

  try {
    const response = await fetch(request);

    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await cache.match(request);

    return cached ?? (await caches.match('/offline.html'));
  }
}
