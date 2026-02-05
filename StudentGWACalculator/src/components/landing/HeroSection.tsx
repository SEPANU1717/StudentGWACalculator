import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../shared';
import { slideUp, staggerContainer, fadeIn } from '../shared/animations';

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

  // Adapt imported animations to valid Variants
  const heroVariants = {
    initial: slideUp.initial,
    animate: { ...slideUp.animate, transition: slideUp.transition }
  };

  const heroFadeIn = {
    initial: fadeIn.initial,
    animate: { ...fadeIn.animate, transition: fadeIn.transition }
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-screen flex items-center relative overflow-hidden py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Badge (small) */}
        <motion.div variants={heroVariants} className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1a1a1a] mb-6"
            suppressHydrationWarning
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-600 dark:text-[#888]">STI Grading System 2025-2026</span>
          </div>
        </motion.div>

        {/* Title (reduced weight, no gradient) */}
        <motion.h1
          variants={heroVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white max-w-4xl mx-auto tracking-tight"
          suppressHydrationWarning
        >
          <span className="block">Calculate Your</span>
          <span className="block text-emerald-500 dark:text-emerald-400">
            Academic Success
          </span>
        </motion.h1>

        {/* Short description (provided) */}
        <motion.p
          variants={heroVariants}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-gray-400 dark:text-[#555]"
          suppressHydrationWarning
        >
          The smart GWA calculator built for STI students. Calculate grades, predict requirements, track multiple subjects, and check your honors eligibility.
        </motion.p>

        {/* CTA Buttons (touch-friendly) */}
        <motion.div variants={heroVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="group px-8 py-4 text-base sm:text-lg min-h-[52px]"
            darkMode={darkMode}
          >
            Start Calculating
          </Button>
        </motion.div>

        {/* Compact boxed stats (subtle, below CTA) */}
        <motion.div variants={heroVariants} className="mt-12">
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1a1a1a] rounded-2xl py-4 px-4 shadow-sm"
                suppressHydrationWarning
              >
                <div className="text-sm font-bold text-gray-800 dark:text-white tabular-nums" suppressHydrationWarning>{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-[#888] mt-1" suppressHydrationWarning>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue (clickable and visible on mobile) */}
        <motion.div variants={heroFadeIn} className="mt-12 opacity-50">
          <button
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-label="Scroll to features"
            className="p-2 rounded-full cursor-pointer hover:bg-emerald-500/10 transition-colors"
          >
            <ChevronDown className="w-6 h-6 text-emerald-500 animate-bounce" />
          </button>
        </motion.div>

        {/* Affiliation disclaimer */}
        <motion.p variants={heroFadeIn} className={`text-xs ${textMuted} mt-8 opacity-60`}>
          <em>Not affiliated with or endorsed by STI</em>
        </motion.p>
      </div>
    </motion.section>
  );
};
