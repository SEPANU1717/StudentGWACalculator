import React from 'react';
import { Subject } from '../../types';
import { Card } from '../shared';

interface GradeInputGridProps {
  subject: Subject;
  onUpdateSubject: (field: keyof Subject, value: string) => void;
  darkMode: boolean;
}

const gradeInputs: { field: keyof Subject; label: string; weight: string }[] = [
  { field: 'prelim', label: 'Prelim', weight: '20%' },
  { field: 'midterm', label: 'Midterm', weight: '20%' },
  { field: 'preFinal', label: 'Pre-Final', weight: '20%' },
  { field: 'finals', label: 'Finals', weight: '40%' }
];

export const GradeInputGrid: React.FC<GradeInputGridProps> = ({
  subject,
  onUpdateSubject,
  darkMode
}) => {
  const textLight = darkMode ? 'text-[#666]' : 'text-gray-500';
  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  const getValue = (field: keyof Subject): number | '' => {
    const value = subject[field];
    if (typeof value === 'number') return value;
    return '';
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {gradeInputs.map(({ field, label, weight }) => {
        const value = getValue(field);

        return (
          <Card key={field} darkMode={darkMode} padding="md">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`grade-${field}`}
                className={`text-[11px] font-semibold ${textLight} uppercase tracking-wider`}
              >
                {label}
              </label>
              <span className={`text-[10px] ${textMuted} font-medium px-1.5 py-0.5 rounded ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
                {weight}
              </span>
            </div>
            <input
              id={`grade-${field}`}
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={value}
              onChange={(e) => onUpdateSubject(field, e.target.value)}
              className={`
                w-full bg-transparent text-2xl font-bold outline-none 
                placeholder-[#222] ${textColor}
                [appearance:textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
                transition-colors duration-150
                min-h-[44px]
              `}
              placeholder="—"
              aria-label={`Enter ${label} grade`}
            />
          </Card>
        );
      })}
    </div>
  );
};
