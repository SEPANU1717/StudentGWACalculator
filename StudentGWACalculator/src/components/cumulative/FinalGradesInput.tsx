import React from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { QuickEntrySubject } from '../../types';
import { Card, Badge } from '../shared';
import { GRADE_OPTIONS_WITH_DESC, UNIT_OPTIONS_WITH_DESC } from '../../utils/constants';

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
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
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

            <div className="flex items-center gap-2 sm:gap-3 mb-3">

              <span className={`w-6 h-6 rounded-md ${inputBg} flex items-center justify-center text-[10px] font-bold ${textMuted} flex-shrink-0`}>
                {index + 1}
              </span>


              <input
                type="text"
                value={subject.name}
                onChange={(e) => onUpdateSubject(subject.id, 'name', e.target.value)}
                placeholder="Subject name"
                className={`flex-1 bg-transparent text-sm font-semibold outline-none ${textColor} placeholder-[#333]`}
                aria-label="Subject name"
              />


              {subject.finalGrade !== '' && typeof subject.finalGrade === 'number' && (
                <Badge
                  variant={subject.finalGrade <= 3.00 ? 'success' : 'error'}
                  size="sm"
                >
                  {subject.finalGrade <= 3.00 ? 'Passed' : 'Failed'}
                </Badge>
              )}


              <button
                onClick={() => onRemoveSubject(subject.id)}
                className={`${textMuted} hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 min-h-[32px] min-w-[32px] flex items-center justify-center flex-shrink-0`}
                aria-label="Remove subject"
              >
                <X className="w-4 h-4" />
              </button>
            </div>



            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div>
                <label className={`block text-[9px] font-semibold ${textMuted} mb-1.5 uppercase tracking-wider`}>
                  Final Grade
                </label>
                <div className="relative">
                  <select
                    value={subject.finalGrade}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateSubject(subject.id, 'finalGrade', val === '' ? '' : parseFloat(val));
                    }}
                    className={`
                      w-full ${inputBg} border ${border} rounded-lg
                      px-4 py-2.5 pr-10
                      text-sm font-semibold
                      outline-none ${textColor}
                      cursor-pointer min-h-[44px]
                      hover:border-blue-500/50 focus:border-blue-500
                      transition-all duration-200
                      appearance-none
                      ${subject.finalGrade === '' ? 'text-gray-400' : ''}
                    `}
                    aria-label="Final grade"
                  >
                    <option value="" disabled className="text-gray-400">Select grade</option>
                    {GRADE_OPTIONS_WITH_DESC.map(({ value, label, description }) => (
                      <option key={value} value={value} className={darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}>
                        {label} - {description}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted} pointer-events-none`} />
                </div>
              </div>

              <div>
                <label className={`block text-[9px] font-semibold ${textMuted} mb-1.5 uppercase tracking-wider`}>
                  Units
                </label>
                <div className="relative">
                  <select
                    value={subject.units}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateSubject(subject.id, 'units', val === '' ? '' : parseFloat(val));
                    }}
                    className={`
                      w-24 ${inputBg} border ${border} rounded-lg
                      px-3 py-2.5 pr-8
                      text-sm font-semibold text-center
                      outline-none ${textColor}
                      cursor-pointer min-h-[44px]
                      hover:border-blue-500/50 focus:border-blue-500
                      transition-all duration-200
                      appearance-none
                      ${subject.units === '' ? 'text-gray-400' : ''}
                    `}
                    aria-label="Units"
                  >
                    <option value="" disabled className="text-gray-400">--</option>
                    {UNIT_OPTIONS_WITH_DESC.map(({ value, label }) => (
                      <option key={value} value={value} className={darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted} pointer-events-none`} />
                </div>
              </div>
            </div>
          </Card>
        ))}


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
