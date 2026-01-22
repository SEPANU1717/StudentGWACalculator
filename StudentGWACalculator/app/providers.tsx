'use client';

import { AppProvider } from '../src/context/AppContext';
import { ThemeProvider } from '../src/context/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AppProvider>{children}</AppProvider>
        </ThemeProvider>
    );
}
