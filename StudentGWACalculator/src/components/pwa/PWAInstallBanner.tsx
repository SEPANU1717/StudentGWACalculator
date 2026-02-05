'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

// Types for the install prompt
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

/**
 * PWA Install Banner Component
 * 
 * Shows a banner prompting users to install the PWA.
 * Supports both native 'beforeinstallprompt' (Android/Desktop)
 * and manual instructions for iOS (Safari).
 */
export function PWAInstallBanner() {
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        // Check if already installed
        const checkInstalled = () => {
            if (typeof window === 'undefined') return false;
            return (
                window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as Navigator & { standalone?: boolean }).standalone === true
            );
        };

        if (checkInstalled()) {
            setIsInstalled(true);
            return;
        }

        // Check if dismissed recently
        const dismissed = localStorage.getItem('pwa-banner-dismissed');
        const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
        const daysSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

        // For iOS, show banner if not installed (since no event fires)
        if (isIosDevice && dismissed && daysSinceDismiss < 7) {
            // Don't show if dismissed recently on iOS
        } else if (isIosDevice) {
            setTimeout(() => setIsVisible(true), 3000);
            return;
        }

        if (dismissed && daysSinceDismiss < 7) {
            setIsDismissed(true);
            return;
        }

        // For Android/Desktop, listen for prompt event
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
            setIsInstallable(true);

            // Delay showing banner for better UX
            setTimeout(() => setIsVisible(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = useCallback(async () => {
        if (!deferredPrompt && !isIOS) return;

        // Note: For iOS we can't programmatically install, we just show instructions
        if (isIOS) {
            // iOS instructions are already visible in the banner body
            return;
        }

        setIsInstalling(true);
        try {
            await deferredPrompt?.prompt();
            const { outcome } = await deferredPrompt?.userChoice!;

            if (outcome === 'accepted') {
                setIsInstalled(true);
                setIsVisible(false);
            }
            setDeferredPrompt(null);
        } catch (error) {
            console.error('Install error:', error);
        } finally {
            setIsInstalling(false);
        }
    }, [deferredPrompt, isIOS]);

    const handleDismiss = useCallback(() => {
        setIsDismissed(true);
        setIsVisible(false);
        localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
    }, []);

    // Render logic - show if installable OR on iOS (and not installed/dismissed)
    const shouldShow = !isDismissed && !isInstalled && isVisible && (isInstallable || isIOS);

    if (!shouldShow) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-emerald-500/25">
                        <Smartphone className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm mb-1">
                            Install STI Grade Calculator
                        </h3>

                        {isIOS ? (
                            <div className="space-y-2 mt-2">
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    To install on iOS:
                                </p>
                                <ol className="text-slate-300 text-xs space-y-1 ml-1">
                                    <li className="flex items-center gap-1">1. Tap <Share className="w-3 h-3" /> <span className="font-medium">Share</span></li>
                                    <li className="flex items-center gap-1">2. Tap <PlusSquare className="w-3 h-3" /> <span className="font-medium">Add to Home Screen</span></li>
                                </ol>
                            </div>
                        ) : (
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Add to your home screen for quick access and offline support.
                            </p>
                        )}

                        {/* Actions (Only for Android/Desktop) */}
                        {!isIOS && (
                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={handleInstall}
                                    disabled={isInstalling}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                                >
                                    <Download className={`w-3.5 h-3.5 ${isInstalling ? 'animate-bounce' : ''}`} />
                                    {isInstalling ? 'Installing...' : 'Install'}
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="px-3 py-2 text-slate-400 hover:text-slate-300 text-xs font-medium transition-colors"
                                >
                                    Not now
                                </button>
                            </div>
                        )}

                        {/* iOS Dismiss Button */}
                        {isIOS && (
                            <button
                                onClick={handleDismiss}
                                className="mt-3 w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        )}
                    </div>

                    {/* Close Button (Top Right) */}
                    {!isIOS && (
                        <button
                            onClick={handleDismiss}
                            className="flex-shrink-0 p-1 text-slate-500 hover:text-slate-400 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PWAInstallBanner;
