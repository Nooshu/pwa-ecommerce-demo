/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// This file will be replaced by the generated service worker when we work with
// the sw-precache and sw-toolbox libraries.

// TODO SW-3 - cache the application shell

// TODO SW-4 - use the cache-first strategy to fetch and cache resources in the
// fetch event listener

// TODO SW-5 - delete outdated caches in the activate event listener

var cachedFiles = [
    '/',
    'index.html',
    'scripts/main.min.js',
    'styles/main.css',
    'images/products/BarrelChair.jpg',
    'images/products/C10.jpg',
    'images/products/Cl2.jpg',
    'images/products/CP03_blue.jpg',
    'images/products/CPC_RECYCLED.jpg',
    'images/products/CPFS.jpg',
    'images/products/CPO2_red.jpg',
    'images/products/CPT.jpg',
    'images/products/CS1.jpg',
    'images/touch/apple-touch-icon.png',
    'images/touch/chrome-touch-icon-192x192.png',
    'images/touch/icon-128x128.png',
    'images/touch/ms-touch-icon-144x144-precomposed.png',
    'images/about-hero-image.jpg',
    'images/delete.svg',
    'images/footer-background.png',
    'images/hamburger.svg',
    'images/header-bg.jpg',
    'images/logo.png'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('cache-v1').then(function (cache) {
            return cache.addAll(cachedFiles);
        })
    );
});

// step 4 cache first
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});


// cleanup and delete (step 5)
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});