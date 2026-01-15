import React, { useState } from 'react';
import { X, Award, Star, Percent, ChevronRight, RotateCcw, Download } from 'lucide-react';
import { SemesterRecord } from '../../types';
import { isDeansListEligible, getTuitionDiscount, calculateSubjectGWA } from '../../utils/gradingCalculations';
import { Card } from '../shared';

interface GradeHistoryPanelProps {
  isOpen: boolean;
  gradeHistory: SemesterRecord[];
  onRemoveFromHistory: (id: string) => void;
  onRestoreRecord?: (record: SemesterRecord) => void;
  onExportRecord?: (record: SemesterRecord) => void;
  darkMode: boolean;
}

export const GradeHistoryPanel: React.FC<GradeHistoryPanelProps> = ({
  isOpen,
  gradeHistory,
  onRemoveFromHistory,
  onRestoreRecord,
  onExportRecord,
  darkMode
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  // Hide if not open OR if there are no history records
  if (!isOpen || gradeHistory.length === 0) return null;

  return (
    <Card
      darkMode={darkMode}
      padding="md"
      className="animate-scale-in"
      id="grade-history-panel"
    >
      <div className="space-y-2">
        {/* Records List */}
        {gradeHistory.map((record) => {
          const hasViolation = record.mode === 'detailed'
            ? record.subjectsData?.some(s => {
              const res = calculateSubjectGWA(s);
              return res && res.grade > 2.00;
            })
            : record.finalGradesData?.some(s => s.finalGrade !== '' && Number(s.finalGrade) > 2.00);

          const isEligible = !hasViolation && isDeansListEligible(record.gwa);
          const discount = !hasViolation ? getTuitionDiscount(record.gwa) : 0;
          const isExpanded = expandedId === record.id;

          return (
            <div key={record.id} className="space-y-0">
              <div
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedId(isExpanded ? null : record.id);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg ${inputBg} border ${border} transition-all cursor-pointer hover:${darkMode ? 'bg-[#111] border-[#222]' : 'bg-gray-100 border-gray-200'} ${isExpanded ? (darkMode ? 'border-b-transparent rounded-b-none bg-[#111]' : 'border-b-transparent rounded-b-none bg-gray-100') : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <ChevronRight className={`w-4 h-4 ${textLight} transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                  <div className="min-w-0 text-left flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`text-sm font-bold ${textColor} truncate`}>
                        {record.name}
                      </div>
                      {record.mode && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${record.mode === 'detailed'
                          ? (darkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600')
                          : (darkMode ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-100 text-purple-600')
                          }`}>
                          {record.mode === 'detailed' ? 'Detailed' : 'Final'}
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] ${textLight}`}>
                      {record.subjects} {record.subjects === 1 ? 'subject' : 'subjects'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className={`text-lg font-black tabular-nums ${isEligible ? (darkMode ? 'text-yellow-400' : 'text-yellow-600') : textColor
                      }`}>
                      {record.gwa.toFixed(2)}
                    </div>
                    {isEligible && (
                      <div className={`text-[9px] font-semibold ${darkMode ? 'text-yellow-400/70' : 'text-yellow-600/70'}`}>
                        Dean's List
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveFromHistory(record.id); }}
                    className={`${textLight} hover:text-red-400 transition-colors p-1.5 rounded hover:${darkMode ? 'bg-red-500/10' : 'bg-red-100'}`}
                    aria-label={`Remove ${record.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className={`p-4 rounded-b-lg ${darkMode ? 'bg-[#0a0a0a] border-[#222]' : 'bg-gray-50 border-gray-200'} border-x border-b animate-scale-in`}>
                  <div className="space-y-3">
                    {/* Stats Row */}
                    <div className={`flex items-center justify-between gap-4 pb-3 border-b ${border}`}>
                      <div className="flex flex-wrap gap-2">
                        {isEligible && (
                          <>
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                              <Award className="w-3 h-3" />
                              <span className="text-[10px] font-bold">Dean's List</span>
                            </div>
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                              <Star className="w-3 h-3" />
                              <span className="text-[10px] font-bold">President's List</span>
                            </div>
                          </>
                        )}
                        {discount > 0 && (
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                            <Percent className={`w-3 h-3 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            <span className={`text-[10px] font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{discount}% Discount</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {onRestoreRecord && (record.subjectsData || record.finalGradesData) && (
                        <button
                          onClick={() => onRestoreRecord(record)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${darkMode ? 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-300'}`}
                        >
                          <RotateCcw className="w-4 h-4" />
                          Restore
                        </button>
                      )}

                      {onExportRecord && (
                        <button
                          onClick={() => onExportRecord(record)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${darkMode ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 border border-emerald-300'}`}
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
