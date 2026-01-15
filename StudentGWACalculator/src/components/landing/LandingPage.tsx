import React from 'react';

import { HeroSection } from './HeroSection';
import { FeaturesGrid } from './FeaturesGrid';
import { BenefitsSection } from './BenefitsSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

import { Header } from '../Header';

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
  const textColor = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header - matches main app */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onShowLanding={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

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
