import React, { useMemo, useState } from 'react';
import { X, Plus, Save, Trash2, History, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { Subject, SemesterRecord } from '../types';
import { calculateSubjectGWA, calculateOverallGWA, getHonorClass, isDeansListEligible } from '../utils/gradingCalculations';

interface CumulativeTabProps {
  darkMode: boolean;
  subjects: Subject[];
  isBaccalaureate: boolean;
  gradeHistory: SemesterRecord[];
  onAddSubject: () => void;
  onRemoveSubject: (id: string) => void;
  onUpdateSubject: (id: string, field: keyof Subject, value: string) => void;
  onClearAllSubjects: () => void;
  onAddToHistory: (name: string, gwa: number, subjectCount: number) => void;
  onRemoveFromHistory: (id: string) => void;
  onClearHistory: () => void;
}

export const CumulativeTab: React.FC<CumulativeTabProps> = ({
  darkMode,
  subjects,
  isBaccalaureate,
  gradeHistory,
  onAddSubject,
  onRemoveSubject,
  onUpdateSubject,
  onClearAllSubjects,
  onAddToHistory,
  onRemoveFromHistory,
  onClearHistory
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [semesterName, setSemesterName] = useState('');

  const overallGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);
  const honorClass = useMemo(() => 
    overallGWA ? getHonorClass(overallGWA, isBaccalaureate) : null, 
    [overallGWA, isBaccalaureate]
  );
  const completedSubjects = useMemo(() => 
    subjects.filter(s => calculateSubjectGWA(s)).length,
    [subjects]
  );

  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const inputBg = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  const gradeFields = [
    { field: 'prelim', label: 'Prelim' },
    { field: 'midterm', label: 'Midterm' },
    { field: 'preFinal', label: 'Pre-Final' },
    { field: 'finals', label: 'Finals' }
  ];

  const handleSaveToHistory = () => {
    if (overallGWA && completedSubjects > 0) {
      const name = semesterName.trim() || `Semester ${gradeHistory.length + 1}`;
      onAddToHistory(name, overallGWA, completedSubjects);
      setSemesterName('');
      onClearAllSubjects();
    }
  };

  const cumulativeGWA = useMemo(() => {
    if (gradeHistory.length === 0) return null;
    const totalWeightedGWA = gradeHistory.reduce((sum, r) => sum + (r.gwa * r.subjects), 0);
    const totalSubjects = gradeHistory.reduce((sum, r) => sum + r.subjects, 0);
    return totalSubjects > 0 ? totalWeightedGWA / totalSubjects : null;
  }, [gradeHistory]);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <span className={`text-xs uppercase tracking-wider font-medium ${textMuted}`}>Your Subjects</span>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className={`text-xs font-medium ${textMuted} hover:text-white transition-colors flex items-center gap-1`}
        >
          <History className="w-3 h-3" />
          History {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Grade History */}
      {showHistory && (
        <div className={`${cardBg} rounded-xl p-4 border ${border} animate-scaleIn`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-medium ${textColor}`}>Grade History</span>
            {gradeHistory.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                Clear All
              </button>
            )}
          </div>
          
          {gradeHistory.length === 0 ? (
            <div className={`text-sm ${textMuted} text-center py-6`}>
              No saved semesters yet
            </div>
          ) : (
            <div className="space-y-2">
              {gradeHistory.map((record) => (
                <div key={record.id} className={`flex items-center justify-between p-3 rounded-xl ${inputBg} border ${border}`}>
                  <div>
                    <div className={`text-sm font-medium ${textColor}`}>{record.name}</div>
                    <div className={`text-xs ${textMuted}`}>{record.date}  {record.subjects} subjects</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-lg font-bold ${
                        isDeansListEligible(record.gwa) ? 'text-yellow-400' : textColor
                      }`}>
                        {record.gwa.toFixed(2)}
                      </span>
                      {isDeansListEligible(record.gwa) && (
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                          <Award className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveFromHistory(record.id)}
                      className={`${textMuted} hover:text-red-400 transition-colors p-1`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {cumulativeGWA && (
                <div className={`mt-3 pt-3 border-t ${border} flex items-center justify-between`}>
                  <span className={`text-sm font-medium ${textMuted}`}>Cumulative GWA</span>
                  <span className={`text-xl font-bold ${
                    isDeansListEligible(cumulativeGWA) ? 'text-yellow-400' : textColor
                  }`}>
                    {cumulativeGWA.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Subject Cards with 2x2 Grid Inputs */}
      {subjects.map((subject, index) => {
        const result = calculateSubjectGWA(subject);
        
        return (
          <div key={subject.id} className={`${cardBg} rounded-xl border ${border} overflow-hidden`}>
            {/* Subject Header */}
            <div className={`p-3 flex items-center justify-between border-b ${border}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className={`text-xs font-medium ${textMuted}`}>#{index + 1}</span>
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => onUpdateSubject(subject.id, 'name', e.target.value)}
                  className={`bg-transparent text-sm font-medium outline-none flex-1 min-w-0 ${textColor}`}
                  placeholder="Subject name"
                />
              </div>
              <div className="flex items-center gap-2">
                {result && (
                  <span className={`text-sm font-bold ${
                    result.status === 'passed' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {result.percentage.toFixed(1)}%
                  </span>
                )}
                {subjects.length > 1 && (
                  <button
                    onClick={() => onRemoveSubject(subject.id)}
                    className={`${textMuted} hover:text-red-400 transition-colors p-1`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Grade Inputs - 2x2 Grid like Calculator */}
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {gradeFields.map(({ field, label }) => (
                  <div key={field} className={`${inputBg} rounded-lg p-3 border ${border}`}>
                    <label className={`block text-xs font-medium ${textMuted} mb-2`}>{label}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={subject[field as keyof Subject]}
                      onChange={(e) => onUpdateSubject(subject.id, field as keyof Subject, e.target.value)}
                      className={`w-full bg-transparent text-lg font-bold outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      placeholder="--"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Add Subject Button */}
      <button
        onClick={onAddSubject}
        className={`w-full ${cardBg} rounded-xl p-4 border ${border} border-dashed text-sm font-medium transition-colors flex items-center justify-center gap-2 ${textMuted} hover:text-white hover:border-[#333]`}
      >
        <Plus className="w-4 h-4" />
        Add Subject
      </button>

      {/* Overall GWA Card */}
      <div className={`${cardBg} rounded-xl p-5 border ${border}`}>
        <div className="flex items-center justify-between mb-3">
          <div className={`text-xs font-medium ${textMuted}`}>OVERALL GWA</div>
          {honorClass && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-medium">
              <Award className="w-3 h-3" />
              {honorClass}
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className={`text-4xl font-bold ${textColor}`}>
            {overallGWA ? overallGWA.toFixed(2) : 'N/A'}
          </div>
          {overallGWA && (
            <span className={`text-sm ${textMuted}`}>
              from {completedSubjects} subject{completedSubjects !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        {!overallGWA && (
          <div className={`text-sm ${textMuted} mt-2`}>
            Complete at least one subject
          </div>
        )}
      </div>

      {/* Save to History */}
      {overallGWA && completedSubjects > 0 && (
        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-3`}>SAVE TO HISTORY</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              placeholder="Semester name"
              className={`flex-1 ${inputBg} border ${border} rounded-lg px-3 py-2.5 text-sm font-medium outline-none ${textColor}`}
            />
            <button
              onClick={handleSaveToHistory}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Clear All Button */}
      {subjects.some(s => s.prelim !== '' || s.midterm !== '' || s.preFinal !== '' || s.finals !== '') && (
        <button
          onClick={onClearAllSubjects}
          className={`w-full ${cardBg} rounded-xl p-4 border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2`}
        >
          <Trash2 className="w-4 h-4" />
          Clear All Subjects
        </button>
      )}
    </div>
  );
};
