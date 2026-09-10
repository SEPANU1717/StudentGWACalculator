
export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export interface PWAState {
    isInstalled: boolean;
    isInstallable: boolean;
    isOnline: boolean;
    isUpdateAvailable: boolean;
    registration: ServiceWorkerRegistration | null;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function isPWAInstalled(): boolean {
    if (typeof window === 'undefined') return false;

    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://')
    );
}

export function isOnline(): boolean {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });

        console.log('✅ Service Worker registered:', registration.scope);

        setInterval(() => {
            registration.update();
        }, 60 * 60 * 1000);

        return registration;
    } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
        return null;
    }
}

export function setupInstallPrompt(onInstallable?: () => void): () => void {
    if (typeof window === 'undefined') return () => { };

    const handleBeforeInstallPrompt = (event: Event) => {
        event.preventDefault();
        deferredPrompt = event as BeforeInstallPromptEvent;
        console.log('📱 Install prompt available');
        onInstallable?.();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
    if (!deferredPrompt) {
        console.log('📱 Install prompt not available');
        return 'unavailable';
    }

    try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`📱 User ${outcome} the install prompt`);
        deferredPrompt = null;
        return outcome;
    } catch (error) {
        console.error('❌ Error showing install prompt:', error);
        return 'unavailable';
    }
}

export function isInstallPromptAvailable(): boolean {
    return deferredPrompt !== null;
}

export function setupNetworkListeners(
    onOnline?: () => void,
    onOffline?: () => void
): () => void {
    if (typeof window === 'undefined') return () => { };

    const handleOnline = () => {
        console.log('🌐 Connection restored');
        onOnline?.();
    };

    const handleOffline = () => {
        console.log('📵 Connection lost');
        onOffline?.();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return 'denied';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return 'denied';
}

export async function subscribeToPush(
    registration: ServiceWorkerRegistration,
    publicVapidKey?: string
): Promise<PushSubscription | null> {
    if (!publicVapidKey) {
        console.log('⚠️ VAPID key not provided');
        return null;
    }

    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        console.log('🔔 Push subscription created');
        return subscription;
    } catch (error) {
        console.error('❌ Push subscription failed:', error);
        return null;
    }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray as Uint8Array<ArrayBuffer>;
}

export async function checkForUpdates(
    registration: ServiceWorkerRegistration
): Promise<boolean> {
    try {
        await registration.update();

        if (registration.waiting) {
            console.log('🔄 Update available');
            return true;
        }

        return false;
    } catch (error) {
        console.error('❌ Update check failed:', error);
        return false;
    }
}

export function skipWaiting(registration: ServiceWorkerRegistration): void {
    if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
}

export async function clearAllCaches(): Promise<void> {
    if (typeof caches === 'undefined') return;

    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('🗑️ All caches cleared');
}

export async function getCacheStorageUsage(): Promise<{
    usage: number;
    quota: number;
    percentage: number;
} | null> {
    if (typeof navigator === 'undefined' || !('storage' in navigator)) {
        return null;
    }

    try {
        const estimate = await navigator.storage.estimate();
        const usage = estimate.usage || 0;
        const quota = estimate.quota || 0;
        const percentage = quota > 0 ? (usage / quota) * 100 : 0;

        return { usage, quota, percentage };
    } catch {
        return null;
    }
}
