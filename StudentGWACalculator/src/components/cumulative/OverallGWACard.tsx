import React from 'react';
import { Award, Star, TrendingUp, BookOpen, History } from 'lucide-react';
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
  historyCount?: number;
  showHistory?: boolean;
  onToggleHistory?: () => void;
  mode?: 'detailed' | 'final';
}

export const OverallGWACard: React.FC<OverallGWACardProps> = ({
  gwa,
  honorClass,
  completedSubjects,
  cumulativeGWA,
  selectedHistoryGWA,
  hasGradeBelowThreshold = false,
  darkMode,
  historyCount = 0,
  showHistory = false,
  onToggleHistory,
  mode = 'detailed'
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
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
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>GWA Summary</div>
          {onToggleHistory && historyCount > 0 && (
            <button
              onClick={onToggleHistory}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                showHistory
                  ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-300')
                  : (darkMode ? 'bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 border border-gray-200')
              }`}
              aria-label="Toggle history"
            >
              <History className="w-4 h-4" />
              <span>History ({historyCount})</span>
            </button>
          )}
        </div>
        <div className="text-center py-2">
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
        {/* Header with History Toggle and Badges */}
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
            {onToggleHistory && historyCount > 0 && (
              <button
                onClick={onToggleHistory}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  showHistory
                    ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-blue-100 text-blue-600 border border-blue-300')
                    : (darkMode ? 'bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#1a1a1a] hover:border-[#333]' : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-200')
                }`}
                aria-label="Toggle history"
              >
                <History className="w-4 h-4" />
                <span>History</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  showHistory
                    ? (darkMode ? 'bg-blue-500/30' : 'bg-blue-200')
                    : (darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200')
                }`}>{historyCount}</span>
              </button>
            )}
          </div>
        </div>

        {/* Compact GWA Display */}
        <div className={`grid ${mode === 'detailed' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
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

          {/* Cumulative GWA - Only show in detailed mode */}
          {mode === 'detailed' && (
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
          )}
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
