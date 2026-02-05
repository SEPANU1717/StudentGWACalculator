'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

interface PWAState {
    isInstalled: boolean;
    isInstallable: boolean;
    isOnline: boolean;
    isUpdateAvailable: boolean;
    isLoading: boolean;
}

interface PWAActions {
    promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
    checkForUpdates: () => Promise<void>;
    applyUpdate: () => void;
}

/**
 * React hook for PWA functionality with dynamic loading
 * 
 * This hook lazy-loads the PWA utilities to keep the initial bundle small
 * and only loads PWA code when needed.
 */
export function usePWA(): PWAState & PWAActions {
    const [state, setState] = useState<PWAState>({
        isInstalled: false,
        isInstallable: false,
        isOnline: true,
        isUpdateAvailable: false,
        isLoading: true,
    });

    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [pwaUtils, setPwaUtils] = useState<typeof import('./pwa') | null>(null);

    // Dynamically load PWA utilities
    useEffect(() => {
        let mounted = true;

        const loadPWA = async () => {
            try {
                // Dynamic import for code splitting
                const utils = await import('./pwa');

                if (!mounted) return;

                setPwaUtils(utils);

                // Check initial state
                const installed = utils.isPWAInstalled();
                const online = utils.isOnline();

                setState((prev) => ({
                    ...prev,
                    isInstalled: installed,
                    isOnline: online,
                    isLoading: false,
                }));

                // Register service worker
                const reg = await utils.registerServiceWorker();
                if (reg && mounted) {
                    setRegistration(reg);

                    // Check for updates
                    if (reg.waiting) {
                        setState((prev) => ({ ...prev, isUpdateAvailable: true }));
                    }

                    // Listen for new updates
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        newWorker?.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setState((prev) => ({ ...prev, isUpdateAvailable: true }));
                            }
                        });
                    });
                }

                // Setup install prompt listener
                const cleanupInstall = utils.setupInstallPrompt(() => {
                    if (mounted) {
                        setState((prev) => ({ ...prev, isInstallable: true }));
                    }
                });

                // Setup network listeners
                const cleanupNetwork = utils.setupNetworkListeners(
                    () => mounted && setState((prev) => ({ ...prev, isOnline: true })),
                    () => mounted && setState((prev) => ({ ...prev, isOnline: false }))
                );

                // Cleanup function
                return () => {
                    cleanupInstall();
                    cleanupNetwork();
                };
            } catch (error) {
                console.error('Failed to load PWA utilities:', error);
                if (mounted) {
                    setState((prev) => ({ ...prev, isLoading: false }));
                }
            }
        };

        loadPWA();

        return () => {
            mounted = false;
        };
    }, []);

    // Install prompt action
    const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
        if (!pwaUtils) return 'unavailable';

        const result = await pwaUtils.promptInstall();

        if (result === 'accepted') {
            setState((prev) => ({ ...prev, isInstalled: true, isInstallable: false }));
        }

        return result;
    }, [pwaUtils]);

    // Check for updates action
    const checkForUpdates = useCallback(async (): Promise<void> => {
        if (!pwaUtils || !registration) return;

        const hasUpdate = await pwaUtils.checkForUpdates(registration);
        setState((prev) => ({ ...prev, isUpdateAvailable: hasUpdate }));
    }, [pwaUtils, registration]);

    // Apply update action
    const applyUpdate = useCallback((): void => {
        if (!pwaUtils || !registration) return;

        pwaUtils.skipWaiting(registration);
        window.location.reload();
    }, [pwaUtils, registration]);

    return useMemo(
        () => ({
            ...state,
            promptInstall,
            checkForUpdates,
            applyUpdate,
        }),
        [state, promptInstall, checkForUpdates, applyUpdate]
    );
}

export default usePWA;
