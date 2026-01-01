import React from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { GRADE_TABLE } from '../../utils/constants';
import { Card } from '../shared';

interface GradeTableProps {
  isOpen: boolean;
  onToggle: () => void;
  darkMode: boolean;
}

export const GradeTable: React.FC<GradeTableProps> = ({
  isOpen,
  onToggle,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#777]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const divider = darkMode ? 'divide-[#111]' : 'divide-gray-100';

  return (
    <div className="space-y-3">
      {/* Toggle Button */}
      <Card 
        darkMode={darkMode} 
        padding="md" 
        onClick={onToggle}
        className="cursor-pointer group"
      >
        <div className="flex items-center justify-between min-h-[32px]">
          <div className="flex items-center gap-2.5">
            <BookOpen className={`w-4 h-4 ${textMuted} group-hover:text-white transition-colors`} />
            <span className={`text-sm font-medium ${textColor}`}>Grade Reference</span>
          </div>
          {isOpen ? (
            <ChevronUp className={`w-4 h-4 ${textMuted}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${textMuted}`} />
          )}
        </div>
      </Card>

      {/* Collapsible Table */}
      {isOpen && (
        <Card darkMode={darkMode} padding="none" className="overflow-hidden animate-scale-in">
          <div className="overflow-x-auto">
            <table id="grading-table" className="w-full text-xs">
              <thead>
                <tr className={`border-b ${border} ${inputBg}`}>
                  <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                    Grade
                  </th>
                  <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                    Range
                  </th>
                  <th className={`px-3 py-2.5 text-left text-[10px] font-semibold ${textMuted} uppercase tracking-wider`}>
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${divider}`}>
                {GRADE_TABLE.map((g) => {
                  const isExcellent = g.grade <= 1.50;
                  const isFailed = g.grade === 5.00;
                  
                  return (
                    <tr key={g.grade} className={`${darkMode ? 'hover:bg-[#0a0a0a]' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className={`px-3 py-2 font-bold ${textColor}`}>
                        {g.grade.toFixed(2)}
                      </td>
                      <td className={`px-3 py-2 ${textLight} font-medium`}>
                        {g.min.toFixed(2)}–{g.max.toFixed(2)}
                      </td>
                      <td className={`px-3 py-2 font-medium ${
                        isFailed ? 'text-red-400' : isExcellent ? 'text-emerald-400' : textLight
                      }`}>
                        {g.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
