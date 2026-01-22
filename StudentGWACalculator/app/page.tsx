'use client';

import { useRouter } from 'next/navigation';
import { LandingPage } from '../src/components/landing/LandingPage';
import { useAppContext } from '../src/context/AppContext';

export default function HomePage() {
    const router = useRouter();
    const { darkMode, toggleDarkMode, setShowUpdateModal } = useAppContext();

    const handleGetStarted = () => {
        localStorage.setItem('hasVisited', 'true');
        router.push('/calculator');

        // Show update modal after 500ms
        setTimeout(() => {
            const UPDATE_MODAL_SEEN_KEY = 'updateModalSeen_v2.0.0';
            const seen = localStorage.getItem(UPDATE_MODAL_SEEN_KEY);
            if (!seen) setShowUpdateModal(true);
        }, 500);
    };

    return (
        <LandingPage
            darkMode={darkMode}
            onGetStarted={handleGetStarted}
            toggleDarkMode={toggleDarkMode}
        />
    );
}
