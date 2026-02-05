'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PWAInstallBanner } from '../components/pwa/PWAInstallBanner';
import { PWAUpdatePrompt } from '../components/pwa/PWAUpdatePrompt';
import { OfflineIndicator } from '../components/pwa/OfflineIndicator';

interface PWAProviderProps {
    children: ReactNode;
}

/**
 * PWA Provider Component
 * 
 * Wraps the application with PWA functionality:
 * - Install banner for prompting users to add to home screen
 * - Update prompt for notifying users about new versions
 * - Offline indicator for showing connection status
 */
export function PWAProvider({ children }: PWAProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Log PWA status in development
        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 PWA Provider initialized');
        }
    }, []);

    // Only render PWA components after mounting (client-side)
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Offline Status Indicator */}
            <OfflineIndicator />

            {/* Main Content */}
            {children}

            {/* PWA Install Banner (bottom of screen) */}
            <PWAInstallBanner />

            {/* Update Prompt (top of screen) */}
            <PWAUpdatePrompt />
        </>
    );
}

export default PWAProvider;
