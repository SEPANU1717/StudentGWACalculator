'use client';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // Minimal pass-through layout — main header and navigation live in the single app page
    return <>{children}</>;
}
