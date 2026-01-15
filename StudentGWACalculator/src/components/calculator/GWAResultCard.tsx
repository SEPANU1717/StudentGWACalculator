import React from 'react';
import { X, Download } from 'lucide-react';
import { GradeResult } from '../../types';
import { Card, Badge } from '../shared';
import { exportToImage } from '../../utils/exportUtils';

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
  darkMode,
  selectedHistoryGWA,
  onClearSelectedHistory
}) => {
  // If showing selected history GWA
  const showingHistory = selectedHistoryGWA !== null && selectedHistoryGWA !== undefined;

  // Always render the card. When there are no grades and no history selected,
  // show a lightweight placeholder so the result area stays visible.
  const showingEmpty = filledCount === 0 && !showingHistory;

  const displayPercentage = percentage?.toFixed(2) ?? null;

  const getProgressColor = () => {
    if (result) {
      return result.status === 'passed' ? 'bg-emerald-500' : 'bg-red-500';
    }
    return 'bg-amber-500';
  };

  // Helper function to get grade color
  const getGradeColor = (grade: number) => {
    if (grade <= 1.25) return darkMode ? 'text-emerald-400' : 'text-emerald-600';
    if (grade <= 1.75) return darkMode ? 'text-green-400' : 'text-green-600';
    if (grade <= 2.25) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (grade <= 3.00) return darkMode ? 'text-orange-400' : 'text-orange-600';
    return darkMode ? 'text-red-400' : 'text-red-600';
  };

  const handleExport = () => {
    exportToImage('gwa-result-card', 'my-gwa-result');
  };

  return (
    <Card darkMode={darkMode} padding="lg" className="mt-4 relative group" id="gwa-result-card">

      {/* Export Button (Absolute to top-right) */}
      {!showingEmpty && (
        <button
          onClick={handleExport}
          className={`absolute top-4 right-4 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-black/5'
            }`}
          title="Export as Image"
        >
          <Download className="w-4 h-4" />
        </button>
      )}

      {/* If showing history GWA */}
      {showingHistory ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider`}>From History</span>
            <button
              onClick={onClearSelectedHistory}
              className={`p-0.5 rounded ${darkMode ? 'text-[#444] hover:text-white hover:bg-[#222]' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
              aria-label="Clear selection"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <div className={`text-4xl font-black tracking-tight tabular-nums ${getGradeColor(selectedHistoryGWA)}`}>
              {selectedHistoryGWA.toFixed(2)}
            </div>
            <Badge variant={selectedHistoryGWA <= 1.75 ? 'success' : 'neutral'} size="sm" darkMode={darkMode}>
              {selectedHistoryGWA <= 1.75 ? 'Honors' : 'Standard'}
            </Badge>
          </div>

          <p className={`text-xs ${darkMode ? 'text-[#666]' : 'text-gray-500'} mt-3`}>
            GWA loaded from history • View Cumulative tab for eligibility
          </p>
        </div>
      ) : (
        /* Normal computed GWA display */
        <div>
          <div className={`text-[10px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider mb-3`}>Grade Result</div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <div className={`text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'} tabular-nums`}>
              {displayPercentage !== null ? `${displayPercentage}%` : 'N/A'}
            </div>
            {result && (
              <Badge variant={result.status === 'passed' ? 'success' : 'error'} size="sm" darkMode={darkMode}>
                {result.description}
              </Badge>
            )}
            {isPartial && !result && (
              <Badge variant="warning" size="sm" darkMode={darkMode}>In Progress</Badge>
            )}
            {showingEmpty && (
              <Badge variant="neutral" size="sm" darkMode={darkMode}>
                No data
              </Badge>
            )}
          </div>

          {/* Progress bar */}
          {displayPercentage && (
            <div className={`w-full h-1.5 rounded-full overflow-hidden mt-4 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
              <div
                className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`}
                style={{ width: `${Math.min(parseFloat(displayPercentage), 100)}%` }}
              />
            </div>
          )}

          {/* Progress bar placeholder for empty state */}
          {showingEmpty && (
            <div className={`w-full h-1.5 rounded-full overflow-hidden mt-4 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
              <div className="h-full w-0" />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
