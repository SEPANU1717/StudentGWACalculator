import React, { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Subject, SemesterRecord } from '../../types';
import { calculateSubjectGWA, calculateOverallGWA, getHonorClass } from '../../utils/gradingCalculations';

import { HeaderSection } from './HeaderSection';
import { GradeHistoryPanel } from './GradeHistoryPanel';
import { SubjectList } from './SubjectList';
import { OverallGWACard } from './OverallGWACard';
import { SaveToHistoryPanel } from './SaveToHistoryPanel';

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
  onSelectHistoryRecord: (gwa: number) => void;
  selectedHistoryGWA: number | null;
  onClearSelectedHistory: () => void;
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
  onClearHistory,
  onSelectHistoryRecord,
  selectedHistoryGWA,
  onClearSelectedHistory
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [semesterName, setSemesterName] = useState('');

  // Calculate results for each subject
  const subjectResults = useMemo(() => {
    const results = new Map<string, ReturnType<typeof calculateSubjectGWA>>();
    subjects.forEach(s => {
      results.set(s.id, calculateSubjectGWA(s));
    });
    return results;
  }, [subjects]);

  const overallGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);
  
  const honorClass = useMemo(() => 
    overallGWA ? getHonorClass(overallGWA, isBaccalaureate) : null, 
    [overallGWA, isBaccalaureate]
  );
  
  const completedSubjects = useMemo(() => 
    subjects.filter(s => calculateSubjectGWA(s)).length,
    [subjects]
  );

  const cumulativeGWA = useMemo(() => {
    if (gradeHistory.length === 0) return null;
    const totalWeightedGWA = gradeHistory.reduce((sum, r) => sum + (r.gwa * r.subjects), 0);
    const totalSubjects = gradeHistory.reduce((sum, r) => sum + r.subjects, 0);
    return totalSubjects > 0 ? totalWeightedGWA / totalSubjects : null;
  }, [gradeHistory]);

  // Check if any completed subject has a grade > 2.00 (disqualifies from Latin honors)
  const hasGradeBelowThreshold = useMemo(() => {
    for (const [, result] of subjectResults) {
      if (result && result.grade > 2.00) return true;
    }
    return false;
  }, [subjectResults]);

  const hasAnyGrades = subjects.some(s => 
    s.prelim !== '' || s.midterm !== '' || s.preFinal !== '' || s.finals !== ''
  );

  const handleSaveToHistory = () => {
    if (overallGWA && completedSubjects > 0) {
      const name = semesterName.trim() || `Semester ${gradeHistory.length + 1}`;
      onAddToHistory(name, overallGWA, completedSubjects);
      setSemesterName('');
      onClearAllSubjects();
      onClearSelectedHistory();
    }
  };

  const handleClearAll = () => {
    onClearAllSubjects();
    onClearSelectedHistory();
  };

  return (
    <div 
      className="space-y-6"
      role="tabpanel"
      id="cumulative-panel"
      aria-labelledby="cumulative-tab"
    >
      {/* Overall GWA Card */}
      <OverallGWACard
        gwa={overallGWA}
        honorClass={honorClass}
        completedSubjects={completedSubjects}
        cumulativeGWA={cumulativeGWA}
        selectedHistoryGWA={selectedHistoryGWA}
        hasGradeBelowThreshold={hasGradeBelowThreshold}
        darkMode={darkMode}
      />

      {/* Subject List */}
      <SubjectList
        subjects={subjects}
        subjectResults={subjectResults}
        onUpdateSubject={onUpdateSubject}
        onRemoveSubject={onRemoveSubject}
        onAddSubject={onAddSubject}
        darkMode={darkMode}
      />

      {/* Save to History */}
      <SaveToHistoryPanel
        semesterName={semesterName}
        onSemesterNameChange={setSemesterName}
        onSave={handleSaveToHistory}
        canSave={overallGWA !== null && completedSubjects > 0}
        darkMode={darkMode}
      />

      {/* Tools Section */}
      <section className="space-y-3">
        <p className={`text-[11px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider`}>
          Tools
        </p>
        
        {/* Grade History Toggle */}
        <HeaderSection
          showHistory={showHistory}
          onToggleHistory={() => setShowHistory(!showHistory)}
          darkMode={darkMode}
        />

        {/* Grade History Panel */}
        <GradeHistoryPanel
          isOpen={showHistory}
          gradeHistory={gradeHistory}
          cumulativeGWA={cumulativeGWA}
          onRemoveFromHistory={onRemoveFromHistory}
          onClearHistory={onClearHistory}
          onSelectRecord={onSelectHistoryRecord}
          darkMode={darkMode}
        />

        {/* Clear All Button */}
        {hasAnyGrades && (
          <button
            onClick={handleClearAll}
            className={`
              w-full py-3 rounded-xl 
              ${darkMode 
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                : 'bg-red-100 hover:bg-red-200 text-red-600'
              }
              text-sm font-semibold
              transition-colors flex items-center justify-center gap-2 min-h-[48px]
              outline-none
            `}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </section>
    </div>
  );
};
