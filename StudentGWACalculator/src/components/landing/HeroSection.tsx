import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../shared';

interface HeroSectionProps {
  onGetStarted: () => void;
  darkMode: boolean;
}

const stats = [
  { value: '20-20-20-40', label: 'STI Weights' },
  { value: '59.5%', label: 'Passing Grade' },
  { value: '1.50', label: "Dean's List" },
  { value: '100%', label: 'Free to Use' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  darkMode
}) => {
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 sm:pt-20 pb-16">
      <div className="text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cardBg} border ${border} mb-3`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-xs font-medium ${textLight}`}>STI Grading System 2025</span>
        </div>

        {/* Affiliation disclaimer */}
        <div className={`max-w-2xl mx-auto mb-6 text-center ${textMuted} text-xs`}>
          <em>This project is not affiliated with or endorsed by STI.</em>
        </div>
        
        {/* Title */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight leading-tight ${textColor}`}>
          Calculate Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400">
            Academic Success
          </span>
        </h1>
        
        {/* Description */}
        <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${textMuted}`}>
          The smart GWA calculator built for STI students. Calculate grades, predict requirements, 
          track multiple subjects, and check your honors eligibility.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="group"
            darkMode={darkMode}
          >
            Start Calculating
          </Button>
          <div className={`flex items-center gap-2 text-sm ${textMuted}`}>
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Free and No Sign-up Required</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className={`${cardBg} rounded-xl p-4 border ${border}`}>
              <div className={`text-lg sm:text-xl font-semibold ${textColor} mb-1 tabular-nums`}>
                {stat.value}
              </div>
              <div className={`text-xs ${textMuted}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
