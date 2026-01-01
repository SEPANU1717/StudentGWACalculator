import React, { useState } from 'react';
import { X, Award, Star, Percent, ChevronRight } from 'lucide-react';
import { SemesterRecord } from '../../types';
import { isDeansListEligible, getTuitionDiscount } from '../../utils/gradingCalculations';
import { Card, Badge } from '../shared';

interface GradeHistoryPanelProps {
  isOpen: boolean;
  gradeHistory: SemesterRecord[];
  cumulativeGWA: number | null;
  onRemoveFromHistory: (id: string) => void;
  onClearHistory: () => void;
  onSelectRecord: (gwa: number) => void;
  darkMode: boolean;
}

export const GradeHistoryPanel: React.FC<GradeHistoryPanelProps> = ({
  isOpen,
  gradeHistory,
  cumulativeGWA,
  onRemoveFromHistory,
  onSelectRecord,
  darkMode
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const textLight = darkMode ? 'text-[#666]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  if (!isOpen) return null;

  return (
    <Card 
      darkMode={darkMode} 
      padding="md" 
      className="animate-scale-in"
      id="grade-history-panel"
    >
      {/* Empty State */}
      {gradeHistory.length === 0 ? (
        <div className={`text-xs ${textLight} text-center py-6`}>
          No saved semesters
        </div>
      ) : (
        <div className="space-y-2">
          {/* Records List */}
          {gradeHistory.map((record) => {
            const isEligible = isDeansListEligible(record.gwa);
            const discount = getTuitionDiscount(record.gwa);
            const isExpanded = expandedId === record.id;
            
            return (
              <div key={record.id} className="space-y-0">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg ${inputBg} border ${border} transition-colors hover:${darkMode ? 'bg-[#111]' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <ChevronRight className={`w-3 h-3 ${textLight} transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                    <div className="min-w-0 text-left">
                      <div className={`text-xs font-semibold ${textColor} truncate`}>
                        {record.name}
                      </div>
                      <div className={`text-[10px] ${textLight}`}>
                        {record.subjects} subj
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold tabular-nums ${
                        isEligible ? 'text-yellow-400' : textColor
                      }`}>
                        {record.gwa.toFixed(2)}
                      </span>
                      {isEligible && <Award className="w-3 h-3 text-yellow-400" />}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemoveFromHistory(record.id); }}
                      className={`${textLight} hover:text-red-400 transition-colors p-1 rounded`}
                      aria-label={`Remove ${record.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`mx-2 p-3 rounded-b-lg ${darkMode ? 'bg-[#050505]' : 'bg-gray-50'} border-x border-b ${border} animate-scale-in`}>
                    <div className="flex items-center justify-between gap-4">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {isEligible && (
                          <>
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                              <Award className="w-2.5 h-2.5" />
                              <span className="text-[9px] font-semibold">Dean's</span>
                            </div>
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                              <Star className="w-2.5 h-2.5" />
                              <span className="text-[9px] font-semibold">President's</span>
                            </div>
                          </>
                        )}
                        {!isEligible && (
                          <span className={`text-[10px] ${textLight}`}>Not eligible for honors</span>
                        )}
                      </div>
                      
                      {/* Discount */}
                      {discount > 0 ? (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                          <Percent className={`w-3 h-3 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          <span className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{discount}%</span>
                          <span className={`text-[9px] ${darkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>discount</span>
                        </div>
                      ) : (
                        <span className={`text-[10px] ${textLight}`}>No discount</span>
                      )}
                    </div>
                    {/* Use button */}
                    <button
                      onClick={() => onSelectRecord(record.gwa)}
                      className={`mt-3 w-full py-2 rounded-lg text-xs font-semibold transition-colors ${darkMode ? 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                    >
                      Use this GWA in Summary
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Cumulative GWA */}
          {cumulativeGWA && (
            <div className={`mt-3 pt-3 border-t ${border}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${textLight}`}>Cumulative GWA</span>
                <Badge variant={isDeansListEligible(cumulativeGWA) ? 'warning' : 'neutral'} size="sm">
                  {cumulativeGWA.toFixed(2)}
                </Badge>
              </div>
              {isDeansListEligible(cumulativeGWA) && (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                      <Star className="w-2.5 h-2.5" />
                      <span className="text-[9px] font-semibold">President's List</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                    <Percent className={`w-3 h-3 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{getTuitionDiscount(cumulativeGWA)}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
