import React from 'react';
import { GradeResult } from '../../types';
import { Card } from '../shared';

interface CurrentStatusCardProps {
  filledCount: number;
  singleResult: GradeResult | null;
  partialPercentage: number | null;
  remainingWeight: number;
  darkMode: boolean;
}

export const CurrentStatusCard: React.FC<CurrentStatusCardProps> = ({
  filledCount,
  singleResult,
  partialPercentage,
  remainingWeight,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#777]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const progressBg = darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200';

  const getDisplayValue = () => {
    if (singleResult) return `${singleResult.percentage.toFixed(2)}%`;
    if (partialPercentage !== null) return `${partialPercentage.toFixed(2)}%`;
    return '—';
  };

  return (
    <Card darkMode={darkMode} padding="lg">
      <div className="text-center">
        <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider mb-3`}>
          {singleResult ? 'Final Result' : 'Current Progress'}
        </p>
        
        {/* Main Value */}
        <div className={`text-3xl font-bold ${textColor} tabular-nums mb-2`}>
          {getDisplayValue()}
        </div>
        
        {/* Status Text */}
        <p className={`text-xs ${textLight} mb-4`}>
          {singleResult 
            ? `Grade: ${singleResult.grade.toFixed(2)} — ${singleResult.status === 'passed' ? 'Passed' : 'Failed'}`
            : filledCount > 0
                ? `${filledCount}/4 grades • ${remainingWeight.toFixed(2)}% remaining`
              : 'Enter grades in Calculator tab'
          }
        </p>

        {/* Progress Bar */}
        {(filledCount > 0 || singleResult) && (
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${progressBg}`}>
            <div 
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                singleResult 
                  ? (singleResult.status === 'passed' ? 'bg-emerald-500' : 'bg-red-500')
                  : 'bg-amber-500'
              }`}
              style={{ 
                width: `${singleResult 
                  ? Math.min(singleResult.percentage, 100) 
                  : (partialPercentage ? Math.min(partialPercentage, 100) : 0)
                }%` 
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
