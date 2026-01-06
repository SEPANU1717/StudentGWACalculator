import React from 'react';
import { Calculator, Split, History, Award, TrendingUp, Zap, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  darkMode: boolean;
}

const features: Feature[] = [
  { 
    icon: Split, 
    title: 'Dual Calculation Modes', 
    description: 'Switch between Detailed grades and Final grades input for maximum flexibility.' 
  },
  { 
    icon: Calculator, 
    title: 'Weighted GWA', 
    description: 'Accurate calculations using credit units and STI\'s 20-20-20-40 system.' 
  },
  { 
    icon: History, 
    title: 'Smart History', 
    description: 'Independent history tracking for each mode with edit and restore capabilities.' 
  },
  { 
    icon: Award, 
    title: 'Latin Honors', 
    description: "Check eligibility for Dean's List, President's List, and graduation honors." 
  },
  { 
    icon: TrendingUp, 
    title: 'Cumulative GWA', 
    description: 'Track your overall GWA across multiple semesters for the complete picture.' 
  },
  { 
    icon: Zap, 
    title: 'Real-time Results', 
    description: 'Instant calculations with pass/fail status and grade predictions.' 
  }
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ darkMode }) => {
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const sectionBg = darkMode ? 'bg-[#050505]' : 'bg-white';

  return (
    <section className={`py-16 sm:py-20 ${sectionBg}`}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className={`text-xs font-medium uppercase tracking-wider ${textMuted}`}>
            Key Features
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold mt-3 mb-4 ${textColor}`}>
            Built for STI Students
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${textMuted}`}>
            Powerful tools designed specifically for accurate GWA tracking and academic planning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className={`
                ${cardBg} rounded-xl p-5 border ${border} 
                transition-all duration-200 
                hover:border-emerald-500/30 hover:scale-[1.02]
              `}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className={`text-base font-semibold mb-2 ${textColor}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${textMuted} leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
