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

    useEffect(() => {
        let mounted = true;

        const loadPWA = async () => {
            try {
                const utils = await import('./pwa');

                if (!mounted) return;

                setPwaUtils(utils);

                const installed = utils.isPWAInstalled();
                const online = utils.isOnline();

                setState((prev) => ({
                    ...prev,
                    isInstalled: installed,
                    isOnline: online,
                    isLoading: false,
                }));

                const reg = await utils.registerServiceWorker();
                if (reg && mounted) {
                    setRegistration(reg);

                    if (reg.waiting) {
                        setState((prev) => ({ ...prev, isUpdateAvailable: true }));
                    }

                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        newWorker?.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setState((prev) => ({ ...prev, isUpdateAvailable: true }));
                            }
                        });
                    });
                }

                const cleanupInstall = utils.setupInstallPrompt(() => {
                    if (mounted) {
                        setState((prev) => ({ ...prev, isInstallable: true }));
                    }
                });

                const cleanupNetwork = utils.setupNetworkListeners(
                    () => mounted && setState((prev) => ({ ...prev, isOnline: true })),
                    () => mounted && setState((prev) => ({ ...prev, isOnline: false }))
                );

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

    const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
        if (!pwaUtils) return 'unavailable';

        const result = await pwaUtils.promptInstall();

        if (result === 'accepted') {
            setState((prev) => ({ ...prev, isInstalled: true, isInstallable: false }));
        }

        return result;
    }, [pwaUtils]);

    const checkForUpdates = useCallback(async (): Promise<void> => {
        if (!pwaUtils || !registration) return;

        const hasUpdate = await pwaUtils.checkForUpdates(registration);
        setState((prev) => ({ ...prev, isUpdateAvailable: hasUpdate }));
    }, [pwaUtils, registration]);

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
