import React from 'react';
import { Calculator, Split, History, Award, TrendingUp, Zap, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, scaleIn, hoverScale } from '../shared/animations';

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
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const sectionBg = darkMode ? '' : 'bg-white';

  const scaleInVariant = {
    initial: scaleIn.initial,
    animate: { ...scaleIn.animate, transition: scaleIn.transition }
  };

  return (
    <motion.section
      id="features"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="py-8 sm:py-16 bg-white dark:bg-black"
      suppressHydrationWarning
    >
      <div className="max-w-5xl mx-auto px-6">

        <motion.div variants={scaleInVariant} className="text-center mb-12">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-[#555]">
            Key Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold mt-3 mb-3 text-gray-900 dark:text-white" suppressHydrationWarning>
            Built for STI Students
          </h2>
          <p className="text-base max-w-2xl mx-auto text-gray-500 dark:text-[#555]" suppressHydrationWarning>
            Powerful tools designed specifically for accurate GWA tracking and academic planning.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleInVariant}
              whileHover={hoverScale.whileHover}
              className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 border border-gray-200 dark:border-[#1a1a1a] transition-all duration-300 hover:border-emerald-500/30"
              suppressHydrationWarning
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white" suppressHydrationWarning>
                {feature.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-[#555] leading-relaxed" suppressHydrationWarning>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
