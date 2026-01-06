import React from 'react';
import { Plus, X } from 'lucide-react';
import { QuickEntrySubject } from '../../types';
import { Card, Badge } from '../shared';

interface FinalGradesInputProps {
  subjects: QuickEntrySubject[];
  onAddSubject: () => void;
  onRemoveSubject: (id: string) => void;
  onUpdateSubject: (id: string, field: keyof QuickEntrySubject, value: string | number) => void;
  darkMode: boolean;
}

export const FinalGradesInput: React.FC<FinalGradesInputProps> = ({
  subjects,
  onAddSubject,
  onRemoveSubject,
  onUpdateSubject,
  darkMode
}) => {
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  return (
    <section className="space-y-3">
      <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>
        Subjects & Final Grades
      </p>

      <div className="space-y-2.5">
        {subjects.map((subject, index) => (
          <Card key={subject.id} darkMode={darkMode} padding="md">
            {/* Subject Header - Number, Name, Remove */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              {/* Number Badge */}
              <span className={`w-6 h-6 rounded-md ${inputBg} flex items-center justify-center text-[10px] font-bold ${textMuted} flex-shrink-0`}>
                {index + 1}
              </span>
              
              {/* Subject Name Input */}
              <input
                type="text"
                value={subject.name}
                onChange={(e) => onUpdateSubject(subject.id, 'name', e.target.value)}
                placeholder="Subject name"
                className={`flex-1 bg-transparent text-sm font-semibold outline-none ${textColor} placeholder-[#333]`}
                aria-label="Subject name"
              />

              {/* Remove Button */}
              <button
                onClick={() => onRemoveSubject(subject.id)}
                className={`${textMuted} hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 min-h-[32px] min-w-[32px] flex items-center justify-center flex-shrink-0`}
                aria-label="Remove subject"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Final Grade and Units - Side by Side */}
            <div className="grid grid-cols-[1fr_auto] gap-3 mb-3">
              <div>
                <label className={`block text-[9px] font-semibold ${textMuted} mb-1 uppercase tracking-wider`}>
                  Final Grade
                </label>
                <input
                  type="number"
                  min="1.00"
                  max="5.00"
                  step="0.01"
                  value={subject.finalGrade}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSubject(subject.id, 'finalGrade', val === '' ? '' : parseFloat(val));
                  }}
                  placeholder="1.00"
                  className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2 text-sm font-bold text-center outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-h-[40px]`}
                  aria-label="Final grade"
                />
              </div>
              
              <div>
                <label className={`block text-[9px] font-semibold ${textMuted} mb-1 uppercase tracking-wider`}>
                  Units
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={subject.units}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSubject(subject.id, 'units', val === '' ? '' : parseFloat(val));
                  }}
                  placeholder="3"
                  className={`w-20 ${inputBg} border ${border} rounded-lg px-3 py-2 text-sm font-bold text-center outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-h-[40px]`}
                  aria-label="Units"
                />
              </div>
            </div>

            {/* Grade Status */}
            {subject.finalGrade !== '' && typeof subject.finalGrade === 'number' && (
              <div className={`pt-3 border-t ${border}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${textMuted}`}>Status:</span>
                  <Badge 
                    variant={subject.finalGrade <= 3.00 ? 'success' : 'error'} 
                    size="sm"
                  >
                    {subject.finalGrade <= 3.00 ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              </div>
            )}
          </Card>
        ))}

        {/* Add Subject Button */}
        <button
          onClick={onAddSubject}
          className={`
            w-full py-3 rounded-xl border border-dashed 
            ${darkMode ? 'border-[#1a1a1a] hover:border-[#333] hover:bg-[#0a0a0a]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            ${textMuted} hover:${darkMode ? 'text-white' : 'text-gray-700'}
            transition-colors flex items-center justify-center gap-2 min-h-[48px]
            outline-none
          `}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Subject</span>
        </button>
      </div>
    </section>
  );
};
