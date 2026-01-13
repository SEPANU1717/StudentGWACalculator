import React from 'react';
import { Target, Award } from 'lucide-react';
import { Card, Badge } from '../shared';

interface QuickStatsGridProps {
  toPass: number | null;
  toTarget: number | null;
  targetGrade: number;
  canPredict: boolean;
  darkMode: boolean;
}

export const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({
  toPass,
  toTarget,
  targetGrade,
  canPredict,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';

  const getDisplayValue = (value: number | null) => {
    if (!canPredict) return '—';
    if (value === null) return '—';
    return value <= 100 ? `${value.toFixed(2)}%` : '100+%';
  };

  const getValueColor = (value: number | null) => {
    if (!canPredict || value === null) return textLight;
    return value > 100 ? 'text-red-400' : 'text-emerald-400';
  };

  const getBadge = (value: number | null) => {
    if (!canPredict || value === null) return null;
    if (value <= 100) {
      return <Badge variant="success" size="sm">✓</Badge>;
    }
    return <Badge variant="error" size="sm">✗</Badge>;
  };

  return (
    <section>
      <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider mb-3`}>
        Requirements
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {/* To Pass */}
        <Card darkMode={darkMode} padding="md">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Target className={`w-3.5 h-3.5 ${textLight}`} />
              <span className={`text-[10px] font-medium ${textLight} uppercase tracking-wide`}>
                To Pass
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className={`text-xl font-bold tabular-nums ${getValueColor(toPass)}`}>
                {getDisplayValue(toPass)}
              </span>
              {getBadge(toPass)}
            </div>
            <p className={`text-[10px] ${textLight} mt-1`}>need 59.5%</p>
          </div>
        </Card>

        {/* To Target */}
        <Card darkMode={darkMode} padding="md">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Award className={`w-3.5 h-3.5 ${textLight}`} />
              <span className={`text-[10px] font-medium ${textLight} uppercase tracking-wide`}>
                To Target
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className={`text-xl font-bold tabular-nums ${getValueColor(toTarget)}`}>
                {getDisplayValue(toTarget)}
              </span>
              {getBadge(toTarget)}
            </div>
            <p className={`text-[10px] ${textLight} mt-1`}>need {targetGrade.toFixed(2)}</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
