'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PWAInstallBanner } from '../components/pwa/PWAInstallBanner';
import { PWAUpdatePrompt } from '../components/pwa/PWAUpdatePrompt';
import { OfflineIndicator } from '../components/pwa/OfflineIndicator';

interface PWAProviderProps {
    children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 PWA Provider initialized');
        }
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>

            <OfflineIndicator />


            {children}


            <PWAInstallBanner />


            <PWAUpdatePrompt />
        </>
    );
}

export default PWAProvider;
