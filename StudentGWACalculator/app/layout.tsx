import type { Metadata } from 'next';
import '../src/index.css';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { AppProvider } from '../src/context/AppContext';

export const metadata: Metadata = {
    metadataBase: new URL('https://gwa.markmnl.dev'),
    title: {
        default: 'STI Grade Calculator',
        template: '%s | STI Grade Calculator'
    },
    description:
        'The smart GWA calculator built for STI students. Calculate semester and cumulative GWAs, simulate "what-if" grade scenarios, and check honors eligibility.',
    keywords:
        'STI grade calculator, GWA calculator, GPA calculator, STI grades, honors eligibility, grade tracker, cumulative GWA',
    openGraph: {
        title: 'STI Grade Calculator — Fast, Private GWA Calculator',
        siteName: 'STI Grade Calculator',
        description:
            'Calculate semester and cumulative GWAs, simulate grade scenarios, and track academic progress with the STI Grade Calculator.',
        type: 'website',
        url: 'https://gwa.markmnl.dev/',
        images: [
            {
                url: '/calculator.png',
                width: 1200,
                height: 630,
                alt: 'STI Grade Calculator',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'STI Grade Calculator — Fast, Private GWA Calculator',
        description:
            'Calculate semester and cumulative GWAs, simulate grade scenarios, and track academic progress with the STI Grade Calculator.',
        images: ['/calculator.png'],
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
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon.png', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png' },
        ],
    },
    manifest: '/manifest.webmanifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="apple-mobile-web-app-title" content="STI GWA" />
                <meta name="application-name" content="STI Grade Calculator" />
                <meta name="theme-color" content="#10b981" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'STI Grade Calculator',
                            alternateName: ['Student GWA Calculator', 'GWA Calc'],
                            url: 'https://gwa.markmnl.dev/',
                        }),
                    }}
                />
            </head>
            <body>
                <ThemeProvider>
                    <AppProvider>{children}</AppProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}