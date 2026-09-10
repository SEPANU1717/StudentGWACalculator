'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            window.location.reload();
        };

        window.addEventListener('online', handleOnline);
        return () => window.removeEventListener('online', handleOnline);
    }, []);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            const response = await fetch('/', { method: 'HEAD' });
            if (response.ok) {
                window.location.reload();
            }
        } catch {
        } finally {
            setIsRetrying(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">

                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-full inline-block border border-slate-700/50 shadow-2xl">
                        <WifiOff className="w-16 h-16 text-emerald-400" />
                    </div>
                </div>


                <h1 className="text-3xl font-bold text-white mb-4">
                    You're Offline
                </h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    It looks like you've lost your internet connection.
                    Don't worry — your data is safely cached and will sync
                    when you're back online.
                </p>


                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
                        {isRetrying ? 'Retrying...' : 'Try Again'}
                    </button>
                    <a
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </a>
                </div>


                <div className="mt-12 flex items-center justify-center gap-2 text-slate-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Waiting for connection...</span>
                </div>
            </div>
        </div>
    );
}
