import React from 'react';
import { GradeResult } from '../../types';
import { Card, Badge } from '../shared';

interface Scenario {
  score: number;
  result: GradeResult | null;
}

interface ScenariosTableProps {
  scenarios: Scenario[];
  darkMode: boolean;
}

export const ScenariosTable: React.FC<ScenariosTableProps> = ({
  scenarios,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#777]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const divider = darkMode ? 'divide-[#111]' : 'divide-gray-100';
  const hoverBg = darkMode ? 'hover:bg-[#0a0a0a]' : 'hover:bg-gray-50';

  if (scenarios.length === 0) return null;

  return (
    <section>
      <p className={`text-[11px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
        Scenarios
      </p>
      
      <Card darkMode={darkMode} padding="none" className="overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${border} ${inputBg}`}>
                <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                  If Avg
                </th>
                <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                  Final %
                </th>
                <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                  Grade
                </th>
                <th className={`px-3 py-2.5 text-right text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                  Result
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${divider}`}>
              {scenarios.map((s) => {
                const isExcellent = s.result?.grade && s.result.grade <= 1.50;
                const isFailed = s.result?.grade === 5.00;
                
                return (
                  <tr key={s.score} className={`${hoverBg} transition-colors`}>
                    <td className={`px-3 py-2 font-bold ${textColor} tabular-nums`}>
                      {s.score}%
                    </td>
                    <td className={`px-3 py-2 ${textLight} font-medium tabular-nums`}>
                      {s.result?.percentage.toFixed(2)}%
                    </td>
                    <td className={`px-3 py-2 font-bold tabular-nums ${
                      isFailed ? 'text-red-400' : isExcellent ? 'text-emerald-400' : textLight
                    }`}>
                      {s.result?.grade.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Badge 
                        variant={s.result?.status === 'passed' ? 'success' : 'error'} 
                        size="sm"
                      >
                        {s.result?.status === 'passed' ? 'Pass' : 'Fail'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};
