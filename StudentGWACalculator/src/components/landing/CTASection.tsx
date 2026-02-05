import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../shared';
import { scaleIn } from '../shared/animations';

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

  // Adapt animation
  const scaleInVariant = {
    initial: scaleIn.initial,
    animate: { ...scaleIn.animate, transition: scaleIn.transition }
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      style={{ scrollMarginTop: '48px' }}
      className="py-12 sm:py-24 bg-white dark:bg-black transition-colors duration-300"
      suppressHydrationWarning
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          variants={scaleInVariant}
          className="bg-white dark:bg-[#0a0a0a] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-[#1a1a1a] shadow-xl"
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10">
            <GraduationCap className="w-10 h-10 text-emerald-500" />
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white" suppressHydrationWarning>
            Start Calculating Today
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-400 dark:text-[#555] mb-10 max-w-lg mx-auto leading-relaxed" suppressHydrationWarning>
            Join STI students tracking their academic journey with confidence.
            Free, private, and easy to use.
          </p>

          {/* CTA Button */}
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            className="px-10 py-4 text-lg"
            darkMode={darkMode}
          >
            Start Now — It's Free
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
