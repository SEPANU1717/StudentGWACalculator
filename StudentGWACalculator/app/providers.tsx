'use client';

import { AppProvider } from '../src/context/AppContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <AppProvider>{children}</AppProvider>
        </ThemeProvider>
    );
}
