import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Offline',
    description: 'You are currently offline. The app will automatically reconnect when your internet is restored.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function OfflineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
