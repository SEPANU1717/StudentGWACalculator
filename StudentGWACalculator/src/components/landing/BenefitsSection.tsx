import React from 'react';
import { CheckCircle, Users, BookOpen } from 'lucide-react';

interface BenefitsSectionProps {
  darkMode: boolean;
}

const benefits = [
  { icon: CheckCircle, text: 'Real-time weighted GWA calculations' },
  { icon: CheckCircle, text: 'Dual mode: Detailed & Final grades' },
  { icon: CheckCircle, text: 'Independent history per mode' },
  { icon: CheckCircle, text: 'Latin honors eligibility tracking' },
  { icon: CheckCircle, text: 'Edit & restore saved semesters' },
  { icon: CheckCircle, text: 'Mobile-friendly & responsive' }
];

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ darkMode }) => {
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const innerBg = darkMode ? 'bg-[#000]' : 'bg-gray-50';

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <span className={`text-xs font-medium uppercase tracking-wider ${textMuted}`}>
              Why Choose This
            </span>
            <h2 className={`text-3xl sm:text-4xl font-semibold mt-3 mb-6 ${textColor}`}>
              Smart and Simple
            </h2>
            <p className={`text-base mb-8 ${textMuted} leading-relaxed`}>
              Purpose-built for STI College students with features that understand your academic needs. 
              From detailed term calculations to cumulative GWA tracking, everything you need is here.
            </p>
            
            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <benefit.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className={`text-sm ${textLight}`}>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Sample Calculator Card */}
          <div className={`${cardBg} rounded-2xl p-6 border ${border}`}>
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <Users className={`w-5 h-5 ${textMuted}`} />
                <span className={`text-sm font-medium ${textColor}`}>For STI Students</span>
              </div>
              
              {/* Sample Calculation */}
              <div className={`${innerBg} rounded-xl p-4 border ${border}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs ${textMuted}`}>Sample Calculation</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                    Passed
                  </span>
                </div>
                
                {/* Grades Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { value: 85, label: 'Prelim' },
                    { value: 88, label: 'Midterm' },
                    { value: 82, label: 'Pre-Fi' },
                    { value: 90, label: 'Finals' }
                  ].map((grade) => (
                    <div key={grade.label} className="text-center">
                      <div className={`text-lg font-bold ${textColor} tabular-nums`}>
                        {grade.value}
                      </div>
                      <div className={`text-xs ${textMuted}`}>{grade.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Result */}
                <div className={`pt-4 border-t ${border} flex items-center justify-between`}>
                  <span className={`text-sm ${textMuted}`}>Final GWA:</span>
                  <span className="text-xl font-bold text-emerald-400 tabular-nums">87.00</span>
                </div>
              </div>
              
              {/* Footer Note */}
              <div className={`flex items-center gap-2 text-xs ${textMuted}`}>
                <BookOpen className="w-4 h-4" />
                <span>Weights: 20% + 20% + 20% + 40% = 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
