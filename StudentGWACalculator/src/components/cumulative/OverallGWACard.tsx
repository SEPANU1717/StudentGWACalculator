import React from 'react';
import { Award, Star, TrendingUp, BookOpen } from 'lucide-react';
import { Card } from '../shared';
import { isDeansListEligible, isPresidentsListEligible, getTuitionDiscount } from '../../utils/gradingCalculations';

interface OverallGWACardProps {
  gwa: number | null;
  honorClass: string | null;
  completedSubjects: number;
  cumulativeGWA?: number | null;
  selectedHistoryGWA?: number | null;
  hasGradeBelowThreshold?: boolean;
  darkMode: boolean;
}

export const OverallGWACard: React.FC<OverallGWACardProps> = ({
  gwa,
  honorClass,
  completedSubjects,
  cumulativeGWA,
  selectedHistoryGWA,
  hasGradeBelowThreshold = false,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#666]' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';

  // Use computed GWA or selected history GWA for term display
  const termGWA = gwa ?? selectedHistoryGWA ?? null;
  const isFromHistory = gwa === null && selectedHistoryGWA !== null;

  // Eligibility checks using cumulative GWA if available, otherwise term GWA
  const effectiveGWA = cumulativeGWA ?? termGWA;
  const deansEligible = termGWA ? isDeansListEligible(termGWA) : false;
  const presidentsEligible = effectiveGWA ? isPresidentsListEligible(effectiveGWA) : false;
  const discount = effectiveGWA ? getTuitionDiscount(effectiveGWA) : 0;

  // Don't show honor class if any grade is below threshold (> 2.00)
  const effectiveHonorClass = hasGradeBelowThreshold ? null : honorClass;

  // Helper function to get GWA status color
  const getGWAColor = (value: number) => {
    if (value <= 1.25) return darkMode ? 'text-emerald-400' : 'text-emerald-600';
    if (value <= 1.75) return darkMode ? 'text-green-400' : 'text-green-600';
    if (value <= 2.25) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (value <= 3.00) return darkMode ? 'text-orange-400' : 'text-orange-600';
    return darkMode ? 'text-red-400' : 'text-red-600';
  };

  // Don't render if no GWA to display
  if (!termGWA && !cumulativeGWA) {
    return (
      <Card darkMode={darkMode} padding="md">
        <div className="text-center py-2">
          <div className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider mb-2`}>GWA Summary</div>
          <div className={`text-3xl font-extrabold tracking-tight ${textMuted} tabular-nums`}>—</div>
          <p className={`text-[10px] ${textMuted} mt-2`}>
            Enter grades to calculate GWA
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card darkMode={darkMode} padding="md">
      <div className="space-y-3">
        {/* Header with badges inline */}
        <div className="flex items-center justify-between gap-2">
          <div className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>GWA Summary</div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {isFromHistory && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                History
              </span>
            )}
            {effectiveHonorClass && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                🏆 {effectiveHonorClass}
              </span>
            )}
          </div>
        </div>

        {/* Compact GWA Display */}
        <div className="grid grid-cols-2 gap-2">
          {/* Term GWA */}
          <div className={`${cardBg} border ${border} rounded-lg p-3`}>
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className={`w-3 h-3 ${textMuted}`} />
              <span className={`text-[9px] font-semibold ${textMuted} uppercase`}>Term</span>
            </div>
            <div className={`text-2xl font-black tabular-nums ${termGWA ? getGWAColor(termGWA) : textMuted}`}>
              {termGWA ? termGWA.toFixed(2) : '—'}
            </div>
            <p className={`text-[9px] ${textMuted}`}>{completedSubjects} subj</p>
          </div>

          {/* Cumulative GWA */}
          <div className={`${cardBg} border ${border} rounded-lg p-3`}>
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className={`w-3 h-3 ${textMuted}`} />
              <span className={`text-[9px] font-semibold ${textMuted} uppercase`}>Cumulative</span>
            </div>
            <div className={`text-2xl font-black tabular-nums ${cumulativeGWA ? getGWAColor(cumulativeGWA) : textMuted}`}>
              {cumulativeGWA ? cumulativeGWA.toFixed(2) : '—'}
            </div>
            <p className={`text-[9px] ${textMuted}`}>Overall</p>
          </div>
        </div>

        {/* Warning if grade below threshold */}
        {hasGradeBelowThreshold && honorClass && (
          <p className={`text-[9px] text-center ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            ⚠ Grade &gt;2.00 disqualifies from Latin honors
          </p>
        )}

        {/* Compact Eligibility Row */}
        {(deansEligible || presidentsEligible || discount > 0) && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {deansEligible && (
              <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                <Award className="w-3 h-3" /> Dean's
              </span>
            )}
            {presidentsEligible && (
              <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-700'}`}>
                <Star className="w-3 h-3" /> President's
              </span>
            )}
            {discount > 0 && (
              <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                {discount}% Off
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
