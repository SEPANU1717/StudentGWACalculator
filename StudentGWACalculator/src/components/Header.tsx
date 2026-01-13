import React from 'react';
import { Sun, Moon, GraduationCap } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onShowLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onShowLanding }) => {
  const bgColor = darkMode ? 'bg-[#000]/95' : 'bg-white/95';
  const borderColor = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-[#666]' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#0a0a0a] hover:bg-[#111] active:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300';

  return (
    <header className={`sticky top-0 z-50 ${bgColor} backdrop-blur-md border-b ${borderColor}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-14 flex items-center justify-between">
        {/* Logo & Brand */}
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
          className={`
            flex items-center gap-2 sm:gap-2.5 cursor-pointer outline-none
            rounded-xl py-1.5 px-2 -ml-2
            transition-all duration-150
            ${darkMode ? 'hover:bg-[#0a0a0a] active:bg-[#111]' : 'hover:bg-gray-100 active:bg-gray-200'}
          `}
          aria-label="Go to landing page"
        >
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${
            darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
          }`}>
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          </div>
          <span className={`text-sm sm:text-base font-bold ${textColor}`}>
            <span className="hidden sm:inline">GWA Calculator</span>
            <span className="sm:hidden">GWA Calc</span>
          </span>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`
            p-2.5 sm:p-2 rounded-xl transition-all duration-150 ${buttonBg} outline-none
            min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px] 
            flex items-center justify-center
          `}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className={`w-5 h-5 sm:w-4 sm:h-4 ${textMuted}`} />
          ) : (
            <Moon className={`w-5 h-5 sm:w-4 sm:h-4 ${textMuted}`} />
          )}
        </button>
      </div>
    </header>
  );
};
