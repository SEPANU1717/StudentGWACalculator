import React from 'react';
import { Sun, Moon, GraduationCap } from 'lucide-react';

interface HeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    onShowLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onShowLanding }) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#000]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#1a1a1a]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-14 flex items-center justify-between">

                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onShowLanding && onShowLanding()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onShowLanding && onShowLanding();
                        }
                    }}
                    className="flex items-center gap-2 sm:gap-2.5 cursor-pointer outline-none rounded-xl py-1.5 px-2 -ml-2 transition-all duration-150"
                    aria-label="Go to landing page"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                        <span className="hidden sm:inline">Student GWA Calculator</span>
                        <span className="sm:hidden">Student GWA Calculator</span>
                    </span>
                </div>


                <button
                    onClick={toggleDarkMode}
                    className="p-2.5 sm:p-2 rounded-xl transition-all duration-150 outline-none bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-[#1a1a1a] dark:hover:bg-[#222] dark:active:bg-[#2a2a2a] min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center text-gray-500 dark:text-gray-400"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {!mounted ? (
                        <div className="w-5 h-5 sm:w-4 sm:h-4" />
                    ) : darkMode ? (
                        <Sun className="w-5 h-5 sm:w-4 sm:h-4" />
                    ) : (
                        <Moon className="w-5 h-5 sm:w-4 sm:h-4" />
                    )}
                </button>
            </div>
        </header>
    );
};
