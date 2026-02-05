'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

// Lazy load the PWA hook for code splitting
const usePWAModule = () => import('../../utils/usePWA');

/**
 * Offline Indicator Component
 * 
 * Shows a subtle banner when offline and a brief "back online" message
 * when connection is restored.
 */
export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        let mounted = true;

        // Dynamically load PWA utilities
        const loadPWA = async () => {
            try {
                const { usePWA } = await usePWAModule();
                // Since we can't use hooks dynamically, we'll use the native API
                if (mounted) {
                    setIsOnline(navigator.onLine);
                    setIsLoading(false);
                }
            } catch {
                if (mounted) {
                    setIsOnline(navigator.onLine);
                    setIsLoading(false);
                }
            }
        };

        loadPWA();

        // Set up event listeners for online/offline
        const handleOnline = () => {
            if (mounted) {
                setIsOnline(true);
            }
        };

        const handleOffline = () => {
            if (mounted) {
                setIsOnline(false);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            mounted = false;
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Track offline -> online transitions
    useEffect(() => {
        if (!isLoading) {
            if (!isOnline) {
                setWasOffline(true);
            } else if (wasOffline && isOnline) {
                setShowOnlineMessage(true);
                const timer = setTimeout(() => {
                    setShowOnlineMessage(false);
                    setWasOffline(false);
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [isOnline, wasOffline, isLoading]);

    if (isLoading) {
        return null;
    }

    // Show offline indicator
    if (!isOnline) {
        return (
            <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-200">
                <div className="bg-amber-500 text-amber-950 px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-lg">
                    <WifiOff className="w-4 h-4" />
                    <span>You're offline — Some features may be limited</span>
                </div>
            </div>
        );
    }

    // Show "back online" message
    if (showOnlineMessage) {
        return (
            <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-200">
                <div className="bg-emerald-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-lg">
                    <Wifi className="w-4 h-4" />
                    <span>You're back online!</span>
                </div>
            </div>
        );
    }

    return null;
}

export default OfflineIndicator;
