import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
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
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';

  return (
    <section className="min-h-[85vh] sm:min-h-[78vh] flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Badge (small) */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${cardBg} border ${border} mb-4`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-xs font-medium ${textLight}`}>STI Grading System 2025-2026</span>
        </div>

        {/* Title (reduced weight, no gradient) */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold mb-3 leading-tight ${textColor} max-w-2xl mx-auto`}>
          <span className="block">Calculate Your</span>
          <span className={`block ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`}>
            Academic Success
          </span>
        </h1>

        {/* Short description (provided) */}
        <p className={`text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed ${textMuted}`}>
          The smart GWA calculator built for STI students. Calculate grades, predict requirements, track multiple subjects, and check your honors eligibility.
        </p>

        {/* CTA Buttons (touch-friendly) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="group px-6 py-3 text-base sm:text-lg min-h-[48px]"
            darkMode={darkMode}
          >
            Start Calculating
          </Button>
        </div>

        {/* Compact boxed stats (subtle, below CTA) */}
        <div className="mt-8">
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 px-4">
            {stats.map((s) => (
              <div key={s.label} className={`flex flex-col items-center justify-center ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'} border ${darkMode ? 'border-[#1a1a1a]' : 'border-gray-200'} rounded-lg py-3 px-4`}>
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'} tabular-nums`}>{s.value}</div>
                <div className={`text-xs ${darkMode ? 'text-[#888]' : 'text-gray-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue (clickable and visible on mobile) */}
        <div className="mt-6">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              aria-label="Scroll to features"
              className="-mt-1 p-2 rounded-full touch-manipulation"
            >
              <ChevronDown className="w-6 h-6 sm:w-5 sm:h-5 text-emerald-400 opacity-90 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Affiliation disclaimer */}
        <p className={`text-xs ${textMuted} mt-6`}>
          <em>Not affiliated with or endorsed by STI</em>
        </p>
      </div>
    </section>
  );
};
