'use client';

import { useRouter } from 'next/navigation';
import { Header } from '../../src/components/Header';
import { TabNavigation, Tab } from '../../src/components/TabNavigation';
import { UpdateModal } from '../../src/components/UpdateModal';
import { useAppContext } from '../../src/context/AppContext';
import { usePathname } from 'next/navigation';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const {
        darkMode,
        toggleDarkMode,
        showUpdateModal,
        markUpdateModalSeen,
        isLoaded,
    } = useAppContext();

    const bgColor = darkMode ? 'bg-[#000]' : 'bg-gray-50';
    const textColor = darkMode ? 'text-white' : 'text-gray-900';

    // Get current tab from URL
    const getCurrentTab = (): Tab => {
        const path = pathname.slice(1) || 'calculator';
        if (['calculator', 'cumulative', 'predictions', 'honors'].includes(path)) {
            return path as Tab;
        }
        return 'calculator';
    };

    const handleTabChange = (tab: Tab) => {
        router.push(`/${tab}`);
    };

    const handleShowLanding = () => {
        router.push('/');
    };

    const transitionClass = isLoaded ? 'transition-colors duration-150' : '';

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} ${transitionClass}`}>
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                onShowLanding={handleShowLanding}
            />

            {/* Update Modal */}
            <UpdateModal
                isOpen={showUpdateModal}
                onClose={markUpdateModalSeen}
                darkMode={darkMode}
            />

            <main className="max-w-lg mx-auto px-4 py-6">
                {/* Tab Navigation */}
                <TabNavigation
                    activeTab={getCurrentTab()}
                    onTabChange={handleTabChange}
                    darkMode={darkMode}
                />

                {/* Page Content */}
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
