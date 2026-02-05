'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, X, Sparkles } from 'lucide-react';

/**
 * PWA Update Prompt Component
 * 
 * Shows a prompt when a new version of the app is available.
 */
export function PWAUpdatePrompt() {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        // Listen for service worker updates
        const checkForUpdates = async () => {
            try {
                const reg = await navigator.serviceWorker.ready;
                setRegistration(reg);

                // Check if there's a waiting worker
                if (reg.waiting) {
                    setIsUpdateAvailable(true);
                    setIsVisible(true);
                }

                // Listen for new updates
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
        if (!registration?.waiting) return;

        setIsUpdating(true);

        // Tell the waiting service worker to skip waiting
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Reload once the new service worker takes over
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }, [registration]);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
    }, []);

    if (!isVisible || !isUpdateAvailable) {
        return null;
    }

    return (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-500/30 rounded-2xl p-4 shadow-2xl shadow-blue-500/20">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm mb-1">
                            Update Available!
                        </h3>
                        <p className="text-blue-100 text-xs leading-relaxed">
                            A new version is ready. Refresh to get the latest features and improvements.
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white text-blue-600 text-xs font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                                {isUpdating ? 'Updating...' : 'Refresh Now'}
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-3 py-2 text-blue-200 hover:text-white text-xs font-medium transition-colors"
                            >
                                Later
                            </button>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 p-1 text-blue-200 hover:text-white transition-colors"
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
