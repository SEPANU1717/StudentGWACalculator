import React, { useMemo, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Subject, SemesterRecord } from '../../types';
import { calculateSubjectGWA, calculateOverallGWA, getHonorClass } from '../../utils/gradingCalculations';

import { HeaderSection } from './HeaderSection';
import { GradeHistoryPanel } from './GradeHistoryPanel';
import { SubjectList } from './SubjectList';
import { OverallGWACard } from './OverallGWACard';
import { SaveToHistoryPanel } from './SaveToHistoryPanel';
import { Card, Button } from '../shared';

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
  
  // State for adding past semester directly
  const [showAddPastSemester, setShowAddPastSemester] = useState(false);
  const [pastSemName, setPastSemName] = useState('');
  const [pastSemGWA, setPastSemGWA] = useState('');
  const [pastSemSubjects, setPastSemSubjects] = useState('');

  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

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

  // Calculate Cumulative GWA: weighted average of all history + current term
  const cumulativeGWA = useMemo(() => {
    const historyWeightedGWA = gradeHistory.reduce((sum, r) => sum + (r.gwa * r.subjects), 0);
    const historySubjects = gradeHistory.reduce((sum, r) => sum + r.subjects, 0);
    
    const currentTermGWA = overallGWA;
    const currentTermSubjects = completedSubjects;
    
    if (historySubjects === 0 && currentTermSubjects === 0) return null;
    
    const totalWeightedGWA = historyWeightedGWA + (currentTermGWA ? currentTermGWA * currentTermSubjects : 0);
    const totalSubjects = historySubjects + currentTermSubjects;
    
    if (totalSubjects === 0) return null;
    
    return Math.round((totalWeightedGWA / totalSubjects) * 100) / 100;
  }, [gradeHistory, overallGWA, completedSubjects]);

  // Check if any completed subject has a grade > 2.00
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

  const handleAddPastSemester = () => {
    const gwa = parseFloat(pastSemGWA);
    const subjectCount = parseInt(pastSemSubjects);
    
    if (gwa >= 1.00 && gwa <= 5.00 && subjectCount > 0) {
      const name = pastSemName.trim() || `Past Semester ${gradeHistory.length + 1}`;
      onAddToHistory(name, Math.round(gwa * 100) / 100, subjectCount);
      setPastSemName('');
      setPastSemGWA('');
      setPastSemSubjects('');
      setShowAddPastSemester(false);
    }
  };

  const handleClearAll = () => {
    onClearAllSubjects();
    onClearSelectedHistory();
  };

  const canAddPastSemester = pastSemGWA !== '' && pastSemSubjects !== '' && 
    parseFloat(pastSemGWA) >= 1.00 && parseFloat(pastSemGWA) <= 5.00 && 
    parseInt(pastSemSubjects) > 0;

  return (
    <div 
      className="space-y-5"
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

      {/* Subject List - Current Term */}
      <SubjectList
        subjects={subjects}
        subjectResults={subjectResults}
        onUpdateSubject={onUpdateSubject}
        onRemoveSubject={onRemoveSubject}
        onAddSubject={onAddSubject}
        darkMode={darkMode}
      />

      {/* Save Current Term to History */}
      <SaveToHistoryPanel
        semesterName={semesterName}
        onSemesterNameChange={setSemesterName}
        onSave={handleSaveToHistory}
        canSave={overallGWA !== null && completedSubjects > 0}
        darkMode={darkMode}
      />

      {/* Add Past Semester Section */}
      <section className="space-y-3">
        <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>
          Past Semesters
        </p>

        {!showAddPastSemester ? (
          <Button
            onClick={() => setShowAddPastSemester(true)}
            variant="ghost"
            size="md"
            icon={Plus}
            fullWidth
            darkMode={darkMode}
          >
            Add Past Semester GWA
          </Button>
        ) : (
          <Card darkMode={darkMode} padding="md">
            <div className="space-y-3">
              <p className={`text-xs font-medium ${textColor}`}>Add Previous Semester</p>
              
              <input
                type="text"
                value={pastSemName}
                onChange={(e) => setPastSemName(e.target.value)}
                placeholder="e.g., 1st Year 1st Sem"
                className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2 text-sm outline-none ${textColor} placeholder-[#555]`}
                style={{ fontSize: '16px' }}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-[10px] font-semibold ${textMuted} mb-1 uppercase`}>GWA</label>
                  <input
                    type="number"
                    min="1.00"
                    max="5.00"
                    step="0.01"
                    value={pastSemGWA}
                    onChange={(e) => setPastSemGWA(e.target.value)}
                    placeholder="1.00"
                    className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2 text-sm font-bold outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-semibold ${textMuted} mb-1 uppercase`}>Subjects</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={pastSemSubjects}
                    onChange={(e) => setPastSemSubjects(e.target.value)}
                    placeholder="7"
                    className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2 text-sm font-bold outline-none ${textColor} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAddPastSemester(false)}
                  variant="ghost"
                  size="sm"
                  darkMode={darkMode}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPastSemester}
                  variant="primary"
                  size="sm"
                  disabled={!canAddPastSemester}
                  darkMode={darkMode}
                >
                  Add to History
                </Button>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* History Section */}
      <section className="space-y-3">
        <HeaderSection
          showHistory={showHistory}
          onToggleHistory={() => setShowHistory(!showHistory)}
          darkMode={darkMode}
        />

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
              w-full py-2.5 rounded-xl 
              ${darkMode ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-600'}
              text-sm font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px]
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
