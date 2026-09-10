import React from 'react';
import { Card, Badge } from '../shared';

interface HonorRequirement {
  gwa: string;
  bacc: string;
  other: string;
}

interface GraduationHonorsTableProps {
  isBaccalaureate: boolean;
  graduationHonor: string | null;
  darkMode: boolean;
}

const honorRequirements: HonorRequirement[] = [
  { gwa: '1.00 – 1.10', bacc: 'Summa Cum Laude', other: 'With Highest Honors' },
  { gwa: '1.11 – 1.30', bacc: 'Magna Cum Laude', other: 'With High Honors' },
  { gwa: '1.31 – 1.50', bacc: 'Cum Laude', other: 'With Honors' }
];

export const GraduationHonorsTable: React.FC<GraduationHonorsTableProps> = ({
  isBaccalaureate,
  graduationHonor,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const border = darkMode ? 'border-[#222]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const divider = darkMode ? 'divide-[#1a1a1a]' : 'divide-gray-150';
  const hoverBg = darkMode ? 'hover:bg-[#0f0f0f]' : 'hover:bg-gray-50';

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className={`text-xs font-semibold ${textMuted} uppercase tracking-wider`}>
          Graduation Honors
        </p>
        {graduationHonor && (
          <Badge variant="warning" size="sm">
            {graduationHonor}
          </Badge>
        )}
      </div>

      <Card darkMode={darkMode} padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${border} ${inputBg}`}>
                <th className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}>
                  GWA Range
                </th>
                <th className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}>
                  {isBaccalaureate ? 'Latin Honor' : 'English Honor'}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${divider}`}>
              {honorRequirements.map((req, i) => {
                const isCurrentHonor = graduationHonor === (isBaccalaureate ? req.bacc : req.other);

                return (
                  <tr
                    key={i}
                    className={`${hoverBg} transition-colors ${isCurrentHonor ? (darkMode ? 'bg-yellow-500/15' : 'bg-yellow-100') : ''}`}
                  >
                    <td className={`px-4 py-3 font-bold ${textLight} tabular-nums`}>
                      {req.gwa}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${isCurrentHonor ? (darkMode ? 'text-yellow-400' : 'text-yellow-600') : textColor}`}>
                      {isBaccalaureate ? req.bacc : req.other}
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
