import React from 'react';
import { Sun, Moon, GraduationCap } from 'lucide-react';

import { HeroSection } from './HeroSection';
import { FeaturesGrid } from './FeaturesGrid';
import { BenefitsSection } from './BenefitsSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

interface LandingPageProps {
  darkMode: boolean;
  onGetStarted: () => void;
  toggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  darkMode, 
  onGetStarted, 
  toggleDarkMode 
}) => {
  const bgColor = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const headerBg = darkMode ? 'bg-[#000]/95' : 'bg-white/95';
  const borderColor = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-[#666]' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#0a0a0a] hover:bg-[#111] active:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header - matches main app */}
      <header className={`sticky top-0 z-50 ${headerBg} backdrop-blur-md border-b ${borderColor}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
            }`}>
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            </div>
            <span className={`text-sm sm:text-base font-bold ${textColor}`}>
              Sepanode Calculator
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

      {/* Main Content */}
      <main>
        <HeroSection onGetStarted={onGetStarted} darkMode={darkMode} />
        <FeaturesGrid darkMode={darkMode} />
        <BenefitsSection darkMode={darkMode} />
        <CTASection onGetStarted={onGetStarted} darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
};
