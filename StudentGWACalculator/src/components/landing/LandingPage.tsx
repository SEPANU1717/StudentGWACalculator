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
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white"
      suppressHydrationWarning
    >
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
