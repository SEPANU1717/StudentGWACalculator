import type { Metadata } from 'next';
import '../src/index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    metadataBase: new URL('https://sep-student-gwa-calculator.vercel.app'),
    title: 'STI Grade Calculator',
    description:
        'STI Grade Calculator — fast, private GWA/GPA calculator for STI students. Calculate semester and cumulative GWAs, simulate "what-if" grade scenarios, check honors eligibility, and save grade history for easy tracking.',
    keywords:
        'STI grade calculator, GWA calculator, GPA calculator, grade simulator, what-if grades, honors eligibility, grade tracker, cumulative GWA',
    openGraph: {
        title: 'STI Grade Calculator — Fast, Private GWA Calculator',
        siteName: 'STI Grade Calculator',
        description:
            'Calculate semester and cumulative GWAs, simulate grade scenarios, and track academic progress with the STI Grade Calculator.',
        type: 'website',
        url: 'https://sep-student-gwa-calculator.vercel.app/',
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
    },
    verification: {
        google: 'wjA-ea2Wy6l8GZMB1w21EIYmMv21QWJboo4fPfqLMJY',
    },
    alternates: {
        canonical: 'https://sep-student-gwa-calculator.vercel.app/',
    },
    icons: {
        icon: '/gwacalc.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'STI Grade Calculator',
                            url: 'https://sep-student-gwa-calculator.vercel.app/',
                        }),
                    }}
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
