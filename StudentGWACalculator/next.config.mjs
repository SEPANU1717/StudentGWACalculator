import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swSrc: 'service-worker.js',
    fallbacks: {
        document: '/offline',
    },
    workboxOptions: {
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'google-fonts-cache',
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                    },
                },
            },
            {
                urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-font-assets',
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                    },
                },
            },
            {
                urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-image-assets',
                    expiration: {
                        maxEntries: 64,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                },
            },
            {
                urlPattern: /\/_next\/image\?url=.+$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'next-image',
                    expiration: {
                        maxEntries: 64,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                },
            },
            {
                urlPattern: /\.(?:mp3|wav|ogg)$/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'static-audio-assets',
                    expiration: {
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                },
            },
            {
                urlPattern: /\.(?:mp4|webm)$/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'static-video-assets',
                    expiration: {
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                },
            },
            {
                urlPattern: /\.(?:js)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-js-assets',
                    expiration: {
                        maxEntries: 64,
                        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                    },
                },
            },
            {
                urlPattern: /\.(?:css|less)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-style-assets',
                    expiration: {
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                    },
                },
            },
            {
                urlPattern: /\/_next\/static.+\.js$/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'next-static-js-assets',
                    expiration: {
                        maxEntries: 64,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                },
            },
            {
                urlPattern: /^https:\/\/gwa\.markmnl\.dev\/api\/.*/i,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'api-cache',
                    networkTimeoutSeconds: 10,
                    expiration: {
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60 * 24, // 24 hours
                    },
                },
            },
            {
                urlPattern: /.*/i,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'others',
                    networkTimeoutSeconds: 10,
                    expiration: {
                        maxEntries: 32,
                        maxAgeSeconds: 60 * 60 * 24, // 24 hours
                    },
                },
            },
        ],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    // Enable compression
    compress: true,
    // Optimize images
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    // Experimental features for better performance
    // Note: optimizeCss is disabled due to compatibility issues with error pages
    // experimental: {
    //     optimizeCss: true,
    // },
    // Headers for SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
            {
                source: '/manifest.webmanifest',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                ],
            },
        ];
    },
};

export default withPWA(nextConfig);
