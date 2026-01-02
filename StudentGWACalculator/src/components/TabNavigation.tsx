import React from 'react';
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
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inactiveText = darkMode ? 'text-[#555]' : 'text-gray-400';

  return (
    <nav className="mb-6" role="tablist" aria-label="Grade calculator sections">
      <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl ${cardBg} border ${border}`}>
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
                flex flex-col items-center justify-center gap-1
                py-2.5 rounded-lg text-[10px] sm:text-xs font-semibold
                transition-all duration-150 min-h-[52px] outline-none
                ${isActive 
                  ? `${darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-emerald-50 text-emerald-700'}` 
                  : `${inactiveText} ${darkMode ? 'hover:bg-[#111] hover:text-[#888]' : 'hover:bg-gray-100 hover:text-gray-600'}`
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : ''}`} />
              <span className="hidden sm:block">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export type { Tab };
