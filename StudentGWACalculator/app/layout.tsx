import type { Metadata, Viewport } from 'next';
import '../src/index.css';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { AppProvider } from '../src/context/AppContext';
import { PWAProvider } from '../src/providers/PWAProvider';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#10b981' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL('https://gwa.markmnl.dev'),
    title: {
        default: 'STI Grade Calculator — Smart GWA Calculator for Students',
        template: '%s | STI Grade Calculator'
    },
    description:
        'The smart GWA calculator built for STI students. Calculate semester and cumulative GWAs, simulate "what-if" grade scenarios, and check honors eligibility. Works offline as a PWA.',
    keywords: [
        'STI grade calculator',
        'GWA calculator',
        'GPA calculator',
        'STI grades',
        'honors eligibility',
        'grade tracker',
        'cumulative GWA',
        'student calculator',
        'academic calculator',
        'offline calculator',
        'PWA calculator'
    ],
    authors: [{ name: 'Mark Manalo', url: 'https://markmnl.dev' }],
    creator: 'Mark Manalo',
    publisher: 'STI Grade Calculator',
    category: 'Education',
    classification: 'Education/Academic Tools',
    openGraph: {
        title: 'STI Grade Calculator — Fast, Private GWA Calculator',
        siteName: 'STI Grade Calculator',
        description:
            'Calculate semester and cumulative GWAs, simulate grade scenarios, and track academic progress with the STI Grade Calculator. Works offline!',
        type: 'website',
        url: 'https://gwa.markmnl.dev/',
        locale: 'en_US',
        images: [
            {
                url: '/calculator.png',
                width: 1200,
                height: 630,
                alt: 'STI Grade Calculator - Smart GWA Calculator for Students',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'STI Grade Calculator — Fast, Private GWA Calculator',
        description:
            'Calculate semester and cumulative GWAs, simulate grade scenarios, and track academic progress. Works offline!',
        images: ['/calculator.png'],
        creator: '@markmnldev',
    },
    verification: {
        google: [
            'wjA-ea2Wy6l8GZMB1w21EIYmMv21QWJboo4fPfqLMJY',
            'mRBD1C_9Oc7a3IlohzHp3OvCMPeRmLy63tPbzFtlnas'
        ],
    },
    alternates: {
        canonical: 'https://gwa.markmnl.dev/',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16' },
            { url: '/icon.png', type: 'image/png', sizes: '192x192' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180' },
        ],
        shortcut: '/favicon.ico',
    },
    manifest: '/manifest.webmanifest',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'STI GWA',
        startupImage: [
            '/apple-touch-icon.png',
        ],
    },
    formatDetection: {
        telephone: false,
        date: false,
        email: false,
        address: false,
    },
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'msapplication-TileColor': '#10b981',
        'msapplication-config': '/browserconfig.xml',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': 'https://gwa.markmnl.dev/#website',
            name: 'STI Grade Calculator',
            alternateName: ['Student GWA Calculator', 'GWA Calc', 'STI GWA'],
            url: 'https://gwa.markmnl.dev/',
            description: 'The smart GWA calculator built for STI students.',
            publisher: {
                '@id': 'https://gwa.markmnl.dev/#organization',
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://gwa.markmnl.dev/app?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': 'WebApplication',
            '@id': 'https://gwa.markmnl.dev/#app',
            name: 'STI Grade Calculator',
            url: 'https://gwa.markmnl.dev/app',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '150',
                bestRating: '5',
                worstRating: '1',
            },
            featureList: [
                'Calculate semester GWA',
                'Calculate cumulative GWA',
                'What-if grade scenarios',
                'Honors eligibility check',
                'Offline support',
                'Works on mobile and desktop',
            ],
            screenshot: 'https://gwa.markmnl.dev/calculator.png',
        },
        {
            '@type': 'Organization',
            '@id': 'https://gwa.markmnl.dev/#organization',
            name: 'STI Grade Calculator',
            url: 'https://gwa.markmnl.dev/',
            logo: {
                '@type': 'ImageObject',
                url: 'https://gwa.markmnl.dev/icon.png',
                width: 192,
                height: 192,
            },
            sameAs: [],
        },
        {
            '@type': 'BreadcrumbList',
            '@id': 'https://gwa.markmnl.dev/#breadcrumb',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://gwa.markmnl.dev/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Calculator',
                    item: 'https://gwa.markmnl.dev/app',
                },
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />


                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />


                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </head>
            <body>
                <ThemeProvider>
                    <AppProvider>
                        <PWAProvider>
                            {children}
                        </PWAProvider>
                    </AppProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}