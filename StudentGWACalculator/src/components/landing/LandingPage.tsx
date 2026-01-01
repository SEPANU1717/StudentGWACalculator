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
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textLight = darkMode ? 'text-[#666]' : 'text-gray-500';
  const buttonBg = darkMode ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-gray-100 hover:bg-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${bgColor}/95 backdrop-blur-md border-b ${border}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'
            }`}>
              <GraduationCap className="w-4 h-4 text-emerald-500" />
            </div>
            <span className={`text-sm font-bold ${textColor}`}>STI GWA</span>
          </div>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-lg transition-colors ${buttonBg} outline-none`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className={`w-4 h-4 ${textLight}`} />
            ) : (
              <Moon className={`w-4 h-4 ${textLight}`} />
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
