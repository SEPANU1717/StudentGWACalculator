import React from 'react';
import { Award, Star, Percent, X } from 'lucide-react';
import { GradeResult } from '../../types';
import { Card, Badge } from '../shared';
import { getTuitionDiscount, isDeansListEligible as checkDeansEligible } from '../../utils/gradingCalculations';

interface GWAResultCardProps {
  percentage: number | null;
  result: GradeResult | null;
  isPartial: boolean;
  filledCount: number;
  remainingGrades: string[];
  isDeansListEligible: boolean;
  darkMode: boolean;
  selectedHistoryGWA?: number | null;
  onClearSelectedHistory?: () => void;
}

export const GWAResultCard: React.FC<GWAResultCardProps> = ({
  percentage,
  result,
  isPartial,
  filledCount,
  remainingGrades,
  isDeansListEligible: deansEligible,
  darkMode,
  selectedHistoryGWA,
  onClearSelectedHistory
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const progressBg = darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200';

  // If showing selected history GWA
  const showingHistory = selectedHistoryGWA !== null && selectedHistoryGWA !== undefined;
  const historyDeansEligible = showingHistory ? checkDeansEligible(selectedHistoryGWA) : false;
  const historyDiscount = showingHistory ? getTuitionDiscount(selectedHistoryGWA) : 0;

  // Don't render if no grades entered AND no history selected
  if (filledCount === 0 && !showingHistory) return null;

  const displayPercentage = percentage?.toFixed(2) ?? null;
  const tuitionDiscount = result ? getTuitionDiscount(result.grade) : 0;
  
  const getProgressColor = () => {
    if (result) {
      return result.status === 'passed' ? 'bg-emerald-500' : 'bg-red-500';
    }
    return 'bg-amber-500';
  };

  return (
    <Card darkMode={darkMode} padding="lg" className="mt-4">
      {/* If showing history GWA */}
      {showingHistory ? (
        <div className="flex items-start justify-between gap-4">
          {/* Left: History GWA Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>From History</span>
              <button
                onClick={onClearSelectedHistory}
                className={`p-0.5 rounded ${darkMode ? 'text-[#555] hover:text-white hover:bg-[#222]' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'} transition-colors`}
                aria-label="Clear selection"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <div className={`text-3xl font-extrabold tracking-tight ${textColor} tabular-nums`}>{selectedHistoryGWA.toFixed(2)}</div>
              <Badge variant={historyDeansEligible ? 'success' : 'neutral'} size="sm">
                {historyDeansEligible ? 'Honors' : 'Standard'}
              </Badge>
            </div>

            {/* Dean's & President's List Badges for history */}
            {historyDeansEligible && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                  <Award className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">Dean's List</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                  <Star className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">President's List</span>
                </div>
              </div>
            )}

            <div className={`text-xs ${textLight} mt-3`}>
              GWA: {selectedHistoryGWA.toFixed(2)} • Loaded from history
            </div>
          </div>

          {/* Right: Tuition Discount for history */}
          {historyDiscount > 0 && (
            <div className={`flex-shrink-0 text-center px-3 py-2 rounded-xl ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Percent className={`w-2.5 h-2.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-[8px] font-semibold uppercase tracking-wide ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Discount</span>
              </div>
              <div className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} tabular-nums`}>
                {historyDiscount}%
              </div>
              <p className={`text-[8px] ${darkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>next term</p>
            </div>
          )}
        </div>
      ) : (
        /* Normal computed GWA display */
        <div className="flex items-start justify-between gap-4">
          {/* Left: GWA Info */}
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider mb-2`}>GWA Summary</div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <div className={`text-3xl font-extrabold tracking-tight ${textColor} tabular-nums`}>{displayPercentage ?? '—'}%</div>
              {result && (
                <Badge variant={result.status === 'passed' ? 'success' : 'error'} size="sm">
                  {result.description}
                </Badge>
              )}
              {isPartial && !result && (
                <Badge variant="warning" size="sm">In Progress</Badge>
              )}
            </div>

            {/* Dean's & President's List Badges */}
            {deansEligible && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                  <Award className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">Dean's List</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                  <Star className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">President's List</span>
                </div>
              </div>
            )}

            {/* Thin progress line */}
            {displayPercentage && (
              <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${progressBg}`}>
                <div
                  className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`}
                  style={{ width: `${Math.min(parseFloat(displayPercentage), 100)}%` }}
                />
              </div>
            )}

            {/* Subtitle */}
            <div className={`text-xs ${textLight} mt-3`}>
              {result ? (
                <>Grade: {result.grade.toFixed(2)} • {result.status === 'passed' ? 'Passed' : 'Failed'}</>
              ) : (
                <>{filledCount}/4 grades • {remainingGrades.join(', ')} remaining</>
              )}
            </div>
          </div>

          {/* Right: Tuition Discount (only when eligible) */}
          {tuitionDiscount > 0 && (
            <div className={`flex-shrink-0 text-center px-3 py-2 rounded-xl ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Percent className={`w-2.5 h-2.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-[8px] font-semibold uppercase tracking-wide ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Discount</span>
              </div>
              <div className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} tabular-nums`}>
                {tuitionDiscount}%
              </div>
              <p className={`text-[8px] ${darkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>next term</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
