'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const usePWAModule = () => import('../../utils/usePWA');

async function isActuallyOffline(): Promise<boolean> {
    if (navigator.onLine) return false;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        await fetch('/favicon.ico', {
            cache: 'no-store',
            mode: 'same-origin',
            signal: controller.signal,
        });
        clearTimeout(timeout);
        return false;
    } catch {
        return true;
    }
}

export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadPWA = async () => {
            try {
                await usePWAModule();
            } catch {
                // usePWA utilities are optional here; connectivity is checked below regardless.
            } finally {
                const offline = await isActuallyOffline();
                if (mounted) {
                    setIsOnline(!offline);
                    setIsLoading(false);
                }
            }
        };

        loadPWA();

        const handleOnline = () => {
            if (mounted) {
                setIsOnline(true);
            }
        };

        const handleOffline = () => {
            isActuallyOffline().then((offline) => {
                if (mounted && offline) {
                    setIsOnline(false);
                }
            });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            mounted = false;
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

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
