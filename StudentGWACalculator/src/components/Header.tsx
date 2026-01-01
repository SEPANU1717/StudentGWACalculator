import React from 'react';
import { Sun, Moon, GraduationCap, Home } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onShowLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onShowLanding }) => {
  const bgColor = darkMode ? 'bg-[#000]/95' : 'bg-white/95';
  const borderColor = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-gray-100 hover:bg-gray-200';

  return (
    <header className={`sticky top-0 z-50 ${bgColor} backdrop-blur-md border-b ${borderColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
            <GraduationCap className="w-4 h-4 text-emerald-500" />
          </div>
          <span className={`text-sm font-bold ${textColor}`}>STI GWA</span>
        </div>
        
        <div className="flex items-center gap-2">
          {onShowLanding && (
            <button
              onClick={onShowLanding}
              className={`p-2 rounded-lg transition-colors ${buttonBg}`}
              aria-label="Home"
            >
              <Home className={`w-4 h-4 ${textMuted}`} />
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${buttonBg}`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className={`w-4 h-4 ${textMuted}`} /> : <Moon className={`w-4 h-4 ${textMuted}`} />}
          </button>
        </div>
      </div>
    </header>
  );
};
