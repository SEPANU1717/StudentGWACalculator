import React from 'react';
import { Card, Badge } from '../shared';

interface GWAOverviewCardsProps {
  termGWA: number | null;
  cumulativeGWA: number | null;
  deansListEligible: boolean;
  presidentsListEligible: boolean;
  darkMode: boolean;
}

export const GWAOverviewCards: React.FC<GWAOverviewCardsProps> = ({
  termGWA,
  cumulativeGWA,
  deansListEligible,
  presidentsListEligible,
  darkMode
}) => {
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className="grid grid-cols-2 gap-3">

      <Card darkMode={darkMode} padding="md">
        <div className="text-center">
          <p className={`text-xs font-semibold ${textLight} uppercase tracking-wide mb-1`}>
            Term GWA
          </p>
          <div className={`text-2xl font-bold ${textColor} tabular-nums mb-2`}>
            {termGWA ? termGWA.toFixed(2) : '—'}
          </div>
          {termGWA !== null && (
            <Badge
              variant={deansListEligible ? 'success' : 'neutral'}
              size="sm"
              darkMode={darkMode}
            >
              {deansListEligible ? '✓' : '✗'} Dean's
            </Badge>
          )}
        </div>
      </Card>


      <Card darkMode={darkMode} padding="md">
        <div className="text-center">
          <p className={`text-xs font-semibold ${textLight} uppercase tracking-wide mb-1`}>
            Cumulative
          </p>
          <div className={`text-2xl font-bold ${textColor} tabular-nums mb-2`}>
            {cumulativeGWA ? cumulativeGWA.toFixed(2) : '—'}
          </div>
          {cumulativeGWA !== null && (
            <Badge
              variant={presidentsListEligible ? 'success' : 'neutral'}
              size="sm"
              darkMode={darkMode}
            >
              {presidentsListEligible ? '✓' : '✗'} President's
            </Badge>
          )}
        </div>
      </Card>
    </div>
  );
};
