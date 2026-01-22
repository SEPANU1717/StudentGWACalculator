'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LandingPage } from '../src/components/landing/LandingPage';
import { useAppContext } from '../src/context/AppContext';

export default function HomePage() {
    const router = useRouter();
    const { darkMode, toggleDarkMode, setShowUpdateModal } = useAppContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGetStarted = () => {
        try {
            localStorage.setItem('hasVisited', 'true');
        } catch (e) {}
        router.push('/app');

        // Show update modal after 500ms
        setTimeout(() => {
            try {
                const UPDATE_MODAL_SEEN_KEY = 'updateModalSeen_v2.0.0';
                const seen = localStorage.getItem(UPDATE_MODAL_SEEN_KEY);
                if (!seen) setShowUpdateModal(true);
            } catch (e) {}
        }, 500);
    };

    if (!mounted) return <div suppressHydrationWarning />;

    return (
        <LandingPage
            darkMode={darkMode}
            onGetStarted={handleGetStarted}
            toggleDarkMode={toggleDarkMode}
        />
    );
}
