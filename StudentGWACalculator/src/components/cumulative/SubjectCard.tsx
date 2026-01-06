import React from 'react';
import { X } from 'lucide-react';
import { Subject, GradeResult } from '../../types';
import { Card, Badge } from '../shared';

interface SubjectCardProps {
  subject: Subject;
  index: number;
  result: GradeResult | null;
  canRemove: boolean;
  onUpdate: (field: keyof Subject, value: string) => void;
  onRemove: () => void;
  darkMode: boolean;
}

const gradeFields: { field: keyof Subject; label: string }[] = [
  { field: 'prelim', label: 'P' },
  { field: 'midterm', label: 'M' },
  { field: 'preFinal', label: 'PF' },
  { field: 'finals', label: 'F' }
];

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  index,
  result,
  canRemove,
  onUpdate,
  onRemove,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  return (
    <Card darkMode={darkMode} padding="md">
      {/* Subject Header - Number, Name, Units, Remove */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3">
        {/* Number Badge */}
        <span className={`w-6 h-6 rounded-md ${inputBg} flex items-center justify-center text-[10px] font-bold ${textMuted} flex-shrink-0`}>
          {index + 1}
        </span>
        
        {/* Subject Name Input */}
        <input
          type="text"
          value={subject.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          className={`flex-1 bg-transparent text-sm font-semibold outline-none ${textColor} placeholder-[#333] min-w-[80px]`}
          placeholder="Subject name"
          aria-label="Subject name"
        />
        
        {/* Units Input - Inline */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-[9px] font-semibold ${textMuted} uppercase hidden sm:inline`}>Units:</span>
          <span className={`text-[9px] font-semibold ${textMuted} uppercase sm:hidden`}>U:</span>
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={subject.units}
            onChange={(e) => onUpdate('units', e.target.value)}
            className={`w-12 sm:w-14 ${inputBg} border ${border} rounded-lg px-1.5 py-1 text-xs sm:text-sm font-bold text-center outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            placeholder="3"
            aria-label="Units"
          />
        </div>
        
        {/* Result Badge */}
        {result && (
          <Badge 
            variant={result.status === 'passed' ? 'success' : 'error'} 
            size="sm"
          >
            {result.grade.toFixed(2)}
          </Badge>
        )}
        
        {/* Remove Button */}
        {canRemove && (
          <button
            onClick={onRemove}
            className={`${textMuted} hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 min-h-[32px] min-w-[32px] flex items-center justify-center flex-shrink-0`}
            aria-label="Remove subject"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Grade Inputs - Single Row */}
      <div className="flex gap-2">
        {gradeFields.map(({ field, label }) => (
          <div key={field} className="flex-1 min-w-0">
            <label className={`block text-[9px] font-semibold ${textMuted} mb-1 text-center uppercase tracking-wider`}>
              {label}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={subject[field]}
              onChange={(e) => onUpdate(field, e.target.value)}
              className={`
                w-full ${inputBg} border ${border} rounded-lg 
                px-2 py-2 text-center text-sm font-bold outline-none ${textColor} 
                transition-colors 
                [appearance:textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
                min-h-[40px]
              `}
              placeholder="—"
              aria-label={`${label} grade`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
