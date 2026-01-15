import React from 'react';
import { Award, Star, TrendingUp, BookOpen, History, Download } from 'lucide-react';
import { Card } from '../shared';
import { isDeansListEligible, isPresidentsListEligible, getTuitionDiscount } from '../../utils/gradingCalculations';


interface OverallGWACardProps {
  gwa: number | null;
  honorClass: string | null;
  completedSubjects: number;
  cumulativeGWA?: number | null;
  selectedHistoryGWA?: number | null;
  hasTermViolation?: boolean;
  hasGlobalViolation?: boolean;
  darkMode: boolean;
  historyCount?: number;
  showHistory?: boolean;
  onToggleHistory?: () => void;
  mode?: 'detailed' | 'final';
  onExport?: () => void;
}

export const OverallGWACard: React.FC<OverallGWACardProps> = ({
  gwa,
  honorClass,
  completedSubjects,
  cumulativeGWA,
  selectedHistoryGWA,
  hasTermViolation = false,
  hasGlobalViolation = false,
  darkMode,
  historyCount = 0,
  showHistory = false,
  onToggleHistory,
  mode = 'detailed',
  onExport
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';

  // Use computed GWA or selected history GWA for term display
  const termGWA = gwa ?? selectedHistoryGWA ?? null;
  const isFromHistory = gwa === null && selectedHistoryGWA !== null;

  // Honors Eligibility Logic: Must check GWA AND ensure no grade is below threshold (> 2.00)
  // Dean's List and Tuition Discount are term-based (STI policy)
  const deansEligible = termGWA && !hasTermViolation ? isDeansListEligible(termGWA) : false;
  const discount = termGWA && !hasTermViolation ? getTuitionDiscount(termGWA) : 0;

  // President's List and Latin honors are residency-based
  const evalGWA = cumulativeGWA ?? termGWA;
  const presidentsEligible = (evalGWA && !hasGlobalViolation) ? isPresidentsListEligible(evalGWA) : false;

  // Don't show honor class if any grade is below threshold (> 2.00) in entire residency
  const effectiveHonorClass = hasGlobalViolation ? null : honorClass;

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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${showHistory
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
    <Card darkMode={darkMode} padding="md" id="overall-gwa-card" className="relative group">
      <div className="space-y-3">
        {/* Header with History Toggle and Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>GWA Summary</div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">

            {/* Export Button */}
            {(termGWA || cumulativeGWA) && onExport && (
              <button
                onClick={onExport}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${darkMode
                  ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
                  }`}
                aria-label="Export Report"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            )}

            {isFromHistory && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                History
              </span>
            )}

            {onToggleHistory && historyCount > 0 && (
              <button
                onClick={onToggleHistory}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${showHistory
                  ? (darkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-blue-100 text-blue-600 border border-blue-300')
                  : (darkMode ? 'bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#1a1a1a] hover:border-[#333]' : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-200')
                  }`}
                aria-label="Toggle history"
              >
                <History className="w-4 h-4" />
                <span>History</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${showHistory
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

        {/* Violation Warnings */}
        {hasGlobalViolation && (
          <p className={`text-[9px] text-center ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            ⚠ Grade &gt;2.00 detected (Graduation Honors Disqualified)
          </p>
        )}
        {!hasGlobalViolation && hasTermViolation && (
          <p className={`text-[9px] text-center ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            ⚠ Current Grade &gt;2.00 detected (Term Honors Disqualified)
          </p>
        )}

        {/* Honors & Eligibility Section - New Clean Placement */}
        {(effectiveHonorClass || deansEligible || presidentsEligible || discount > 0) && (
          <div className={`p-3 rounded-lg border ${border} ${darkMode ? 'bg-[#111]' : 'bg-white'}`}>
            <div className={`text-[9px] font-semibold ${textMuted} uppercase tracking-wider mb-2`}>Honors & Eligibility</div>
            <div className="flex flex-wrap gap-2">
              {effectiveHonorClass && (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded ${darkMode ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}>
                  🏆 {effectiveHonorClass}
                </span>
              )}
              {deansEligible && (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded ${darkMode ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                  <Award className="w-3 h-3" /> Dean's List
                </span>
              )}
              {presidentsEligible && (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded ${darkMode ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                  <Star className="w-3 h-3" /> President's List
                </span>
              )}
              {discount > 0 && (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded ${darkMode ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                  🏷️ {discount}% Tuition Discount
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
