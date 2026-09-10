import React from 'react';
import { CheckCircle, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '../shared/animations';

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
  const slideUpVariant = {
    initial: slideUp.initial,
    animate: { ...slideUp.animate, transition: slideUp.transition }
  };

  const fadeInVariant = {
    initial: fadeIn.initial,
    animate: { ...fadeIn.animate, transition: fadeIn.transition }
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      style={{ scrollMarginTop: '48px' }}
      className="py-12 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div variants={staggerLocal}>
            <motion.span
              variants={fadeInVariant}
              className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-[#555] block mb-3"
              suppressHydrationWarning
            >
              Why Choose This
            </motion.span>
            <motion.h2
              variants={slideUpVariant}
              className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-900 dark:text-white leading-tight"
              suppressHydrationWarning
            >
              Smart and Simple
            </motion.h2>
            <motion.p
              variants={slideUpVariant}
              className="text-base sm:text-lg mb-8 text-gray-400 dark:text-[#555] leading-relaxed"
              suppressHydrationWarning
            >
              Purpose-built for STI College students with features that understand your academic needs.
              From detailed term calculations to cumulative GWA tracking, everything you need is here.
            </motion.p>


            <motion.div variants={staggerLocal} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div variants={slideUpVariant} key={i} className="flex items-center gap-3">
                  <benefit.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-[#888]" suppressHydrationWarning>{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>


          <motion.div
            variants={slideUpVariant}
            className="relative"
          >
            <div className="bg-white dark:bg-[#0a0a0a] relative rounded-3xl p-8 border border-gray-200 dark:border-[#1a1a1a] shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="space-y-6">

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                      <Users className="w-5 h-5 text-gray-400 dark:text-[#555]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#555]" suppressHydrationWarning>Target Audience</span>
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white" suppressHydrationWarning>STI Students</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                </div>


                <div className="rounded-2xl p-6 border border-gray-200 dark:border-[#1a1a1a] bg-gray-50/80 dark:bg-[#111]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-gray-400 dark:text-[#555] uppercase tracking-wide" suppressHydrationWarning>Sample GWA Computation</span>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Passed
                    </span>
                  </div>


                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { value: 1.25, label: 'Prelim' },
                      { value: 1.50, label: 'Midterm' },
                      { value: 1.75, label: 'Pre-Fi' },
                      { value: 1.25, label: 'Finals' }
                    ].map((grade) => (
                      <div key={grade.label} className="text-center group cursor-default">
                        <div className="text-lg sm:text-lg font-black text-gray-900 dark:text-white tabular-nums mb-1 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>
                          {grade.value.toFixed(2)}
                        </div>
                        <div className="text-[9px] uppercase font-bold text-gray-400 dark:text-[#555]" suppressHydrationWarning>{grade.label}</div>
                      </div>
                    ))}
                  </div>


                  <div className="pt-5 border-t border-gray-200 dark:border-[#1a1a1a] flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 dark:text-[#555]" suppressHydrationWarning>Final Grade</span>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-emerald-500 tabular-nums leading-none">1.44</span>
                      <span className="text-[9px] text-emerald-600/60 font-medium">Dean's List Eligible</span>
                    </div>
                  </div>
                </div>


                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 dark:text-[#555] uppercase tracking-wider justify-center opacity-60" suppressHydrationWarning>
                  <BookOpen className="w-3 h-3" />
                  <span>Based on DO 20-20-20-40 System</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const staggerLocal = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
