import React from 'react';
import { Calculator, TrendingUp, BarChart3, Award, Zap, Shield, LucideIcon } from 'lucide-react';

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
    icon: Calculator, 
    title: 'GWA Calculator', 
    description: 'Calculate your weighted GWA in real-time with the STI grading system.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Smart Predictions', 
    description: 'See what grades you need in remaining subjects to pass or hit your target.' 
  },
  { 
    icon: BarChart3, 
    title: 'Multi-Subject', 
    description: 'Track multiple subjects at once and calculate cumulative GWA.' 
  },
  { 
    icon: Award, 
    title: 'Honors Check', 
    description: "Instantly see if you qualify for Dean's List or graduation honors." 
  },
  { 
    icon: Zap, 
    title: 'What-If Analysis', 
    description: 'Simulate different grade scenarios and see the impact instantly.' 
  },
  { 
    icon: Shield, 
    title: 'STI Grading', 
    description: "Built specifically for STI's 20-20-20-40 weighted grading system." 
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
        <div className="text-center mb-10 sm:mb-12">
          <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>
            Features
          </span>
          <h2 className={`text-xl sm:text-2xl font-bold mt-2 mb-4 ${textColor}`}>
            Everything You Need
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${textMuted}`}>
            Powerful tools designed specifically for STI students to track and improve their academic performance.
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
