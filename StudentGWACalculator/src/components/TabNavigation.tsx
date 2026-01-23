import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, BarChart3, Award } from 'lucide-react';

type Tab = 'calculator' | 'predictions' | 'cumulative' | 'honors';

interface TabNavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    darkMode: boolean;
}

const tabs: { id: Tab; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'calculator', label: 'Calculator', shortLabel: 'Calc', icon: Calculator },
    { id: 'predictions', label: 'Predictions', shortLabel: 'Predict', icon: TrendingUp },
    { id: 'cumulative', label: 'Cumulative', shortLabel: 'GWA', icon: BarChart3 },
    { id: 'honors', label: 'Honors', shortLabel: 'Honors', icon: Award }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({
    activeTab,
    onTabChange,
    darkMode
}) => {
    return (
        <nav className="mb-6" role="tablist" aria-label="Grade calculator sections">
            <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl ${darkMode ? 'bg-[#0a0a0a] border border-[#1a1a1a]' : 'bg-white border border-gray-200'}`}>
                {tabs.map(({ id, label, shortLabel, icon: Icon }) => {
                    const isActive = activeTab === id;

                    return (
                        <button
                            key={id}
                            onClick={() => onTabChange(id)}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`${id}-panel`}
                            className={`
                                relative flex flex-col items-center justify-center gap-1
                                py-2.5 rounded-lg text-[10px] sm:text-xs font-semibold
                                transition-colors duration-200 min-h-[52px] outline-none
                                ${isActive
                                    ? `${darkMode ? 'text-white' : 'text-emerald-700'}`
                                    : `${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`
                                }
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`absolute inset-0 rounded-lg ${darkMode ? 'bg-[#1a1a1a]' : 'bg-emerald-50'}`}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="relative z-10 flex flex-col items-center gap-1">
                                <Icon className={`w-4 h-4 ${isActive ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : ''}`} />
                                <span className="hidden sm:block">{label}</span>
                                <span className="sm:hidden">{shortLabel}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export type { Tab };
