import React from 'react';
import { Award, Star, Percent } from 'lucide-react';
import { Card, Badge } from '../shared';
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
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';

  // Use computed GWA or selected history GWA
  const displayGWA = gwa ?? selectedHistoryGWA ?? null;
  const isFromHistory = gwa === null && selectedHistoryGWA !== null;

  const deansEligible = displayGWA ? isDeansListEligible(displayGWA) : false;
  // Allow president eligibility to be checked against cumulative GWA when available,
  // otherwise fall back to the displayed/selected GWA so badges appear when user
  // selects a history record or when term GWA equals cumulative.
  const presidentsEligible = (cumulativeGWA ?? displayGWA) ? isPresidentsListEligible((cumulativeGWA ?? displayGWA) as number) : false;
  const discount = displayGWA ? getTuitionDiscount(displayGWA) : 0;

  // Don't show honor class if any grade is below threshold (> 2.00)
  const effectiveHonorClass = hasGradeBelowThreshold ? null : honorClass;

  // Don't render if no GWA to display
  if (!displayGWA) {
    return (
      <Card darkMode={darkMode} padding="lg">
        <div className="text-left">
          <div className={`text-xs font-semibold ${textMuted} uppercase tracking-wider mb-2`}>GWA Summary</div>
          <div className={`text-3xl font-extrabold tracking-tight ${textColor} tabular-nums`}>—</div>
          <p className={`text-xs ${textLight} mt-3`}>
            {completedSubjects} subject{completedSubjects !== 1 ? 's' : ''} completed • GWA: —
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card darkMode={darkMode} padding="lg">
      <div className="text-left">
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs font-semibold ${textMuted} uppercase tracking-wider`}>GWA Summary</div>
          {isFromHistory && (
            <span className={`text-[10px] px-2 py-0.5 rounded ${darkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              From History
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          {/* Left side: GWA and honor class */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`text-3xl font-extrabold tracking-tight ${textColor} tabular-nums`}>{displayGWA.toFixed(2)}</div>
              {effectiveHonorClass && (
                <Badge size="sm" variant="success" darkMode={darkMode}>
                  {effectiveHonorClass}
                </Badge>
              )}
            </div>

            {/* Warning if grade below threshold */}
            {hasGradeBelowThreshold && honorClass && (
              <p className="text-[10px] text-amber-500 mt-1">⚠ Grade &gt;2.00 disqualifies from Latin honors</p>
            )}

            {/* Dean's List and President's List badges */}
            {(deansEligible || presidentsEligible) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {deansEligible && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-100 text-yellow-700'}`}>
                    <Award className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">Dean's List</span>
                  </div>
                )}
                {presidentsEligible && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                    <Star className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">President's List</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side: Tuition Discount */}
          {discount > 0 && (
            <div className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
              <div className="flex items-center gap-1 mb-0.5">
                <Percent className={`w-3 h-3 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-[9px] font-medium ${darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'} uppercase`}>Discount</span>
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} tabular-nums`}>{discount}%</span>
            </div>
          )}
        </div>

        <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
          <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
        </div>

        <p className={`text-xs ${textLight} mt-3`}>
          {isFromHistory ? 'Selected from history' : `${completedSubjects} subject${completedSubjects !== 1 ? 's' : ''} completed`} • GWA: {displayGWA.toFixed(2)}
        </p>
      </div>
    </Card>
  );
};
