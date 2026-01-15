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
  const sectionBg = darkMode ? '' : 'bg-white';

  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    }, { threshold: 0.12, rootMargin: '0px 0px -40% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ scrollMarginTop: '48px' }} className={`py-12 sm:py-16 ${sectionBg} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className={`${cardBg} rounded-2xl p-6 sm:p-10 border ${border}`}>
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'
            }`}>
            <GraduationCap className="w-8 h-8 text-emerald-500" />
          </div>

          {/* Title */}
          <h3 className={`text-2xl sm:text-3xl font-semibold mb-4 ${textColor}`}>
            Start Calculating Today
          </h3>

          {/* Description */}
          <p className={`text-base ${textMuted} mb-8 max-w-md mx-auto leading-relaxed`}>
            Join STI students tracking their academic journey with confidence.
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
