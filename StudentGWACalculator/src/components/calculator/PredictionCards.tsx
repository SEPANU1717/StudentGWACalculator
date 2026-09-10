import React from 'react';
import { Target, CheckCircle } from 'lucide-react';
import { Card } from '../shared';

interface PredictionCardsProps {
  hasAllGrades: boolean;
  canPredict: boolean;
  toTarget: number | null;
  toPass: number | null;
  darkMode: boolean;
}

export const PredictionCards: React.FC<PredictionCardsProps> = ({
  hasAllGrades,
  canPredict,
  toTarget,
  toPass,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  const getDisplayValue = (value: number | null) => {
    if (hasAllGrades) return '✓';
    if (!canPredict) return '—';
    if (value === null) return '—';
    return value <= 100 ? `${value.toFixed(2)}%` : '—';
  };

  const getValueColor = (value: number | null) => {
    if (hasAllGrades) return 'text-emerald-400';
    if (!canPredict || value === null) return textMuted;
    return value > 100 ? 'text-red-400' : textColor;
  };

  const isAchievable = (value: number | null) => {
    if (hasAllGrades) return true;
    if (value === null) return false;
    return value <= 100;
  };

  return (
    <section>
      <p className={`text-[11px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
        Requirements
      </p>
      <div className="grid grid-cols-2 gap-3">

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Target className={`w-3.5 h-3.5 ${textMuted}`} />
            <span className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
              For Target
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold tabular-nums ${getValueColor(toTarget)}`}>
              {getDisplayValue(toTarget)}
            </span>
            {canPredict && !hasAllGrades && isAchievable(toTarget) && (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            )}
          </div>
        </Card>


        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className={`w-3.5 h-3.5 ${textMuted}`} />
            <span className={`text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
              To Pass
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold tabular-nums ${getValueColor(toPass)}`}>
              {getDisplayValue(toPass)}
            </span>
            {canPredict && !hasAllGrades && isAchievable(toPass) && (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
