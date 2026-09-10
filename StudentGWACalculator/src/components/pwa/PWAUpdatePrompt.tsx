'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, X, GraduationCap } from 'lucide-react';

export function PWAUpdatePrompt() {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        const checkForUpdates = async () => {
            try {
                const reg = await navigator.serviceWorker.ready;
                setRegistration(reg);

                if (reg.waiting) {
                    setIsUpdateAvailable(true);
                    setIsVisible(true);
                }

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker?.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            setIsUpdateAvailable(true);
                            setIsVisible(true);
                        }
                    });
                });
            } catch (error) {
                console.error('Error checking for updates:', error);
            }
        };

        checkForUpdates();
    }, []);

    const handleUpdate = useCallback(() => {
        if (!registration?.waiting) {
            window.location.reload();
            return;
        }

        setIsUpdating(true);

        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        const handleControllerChange = () => {
            window.location.reload();
        };

        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }, [registration]);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
    }, []);

    if (!isVisible || !isUpdateAvailable) {
        return null;
    }

    return (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl shadow-emerald-500/20">
                <div className="flex items-start gap-3">

                    <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>


                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm mb-1">
                            New Version Available!
                        </h3>
                        <p className="text-emerald-50 text-xs leading-relaxed">
                            A new grade calculator update is ready. Refresh now to get the latest features.
                        </p>


                        <div className="flex items-center gap-2 mt-3">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                                {isUpdating ? 'Refreshing...' : 'Refresh Now'}
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-3 py-2 text-emerald-100 hover:text-white text-xs font-medium transition-colors"
                            >
                                Later
                            </button>
                        </div>
                    </div>


                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 p-1 text-emerald-200 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PWAUpdatePrompt;
