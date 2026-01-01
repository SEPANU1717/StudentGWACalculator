import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '../shared';

interface CTASectionProps {
  onGetStarted: () => void;
  darkMode: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted, darkMode }) => {
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const sectionBg = darkMode ? 'bg-[#050505]' : 'bg-white';

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className={`${cardBg} rounded-2xl p-8 sm:p-12 border ${border}`}>
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
            darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'
          }`}>
            <GraduationCap className="w-8 h-8 text-emerald-500" />
          </div>
          
          {/* Title */}
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${textColor}`}>
            Ready to Calculate?
          </h3>
          
          {/* Description */}
          <p className={`text-sm sm:text-base ${textMuted} mb-8 max-w-md mx-auto`}>
            Start calculating your GWA now. It's free, fast, and built specifically for STI students.
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            darkMode={darkMode}
          >
            Start Now — It's Free
          </Button>
        </div>
      </div>
    </section>
  );
};
