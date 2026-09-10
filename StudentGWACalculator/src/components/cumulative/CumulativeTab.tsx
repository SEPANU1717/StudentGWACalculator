import React, { useMemo, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Subject, SemesterRecord, QuickEntrySubject } from '../../types';
import { calculateSubjectGWA, calculateOverallGWA, getHonorClass } from '../../utils/gradingCalculations';

import { GradeHistoryPanel } from './GradeHistoryPanel';
import { SubjectList } from './SubjectList';
import { OverallGWACard } from './OverallGWACard';
import { SaveToHistoryPanel } from './SaveToHistoryPanel';
import { FinalGradesInput } from './FinalGradesInput';
import { ModeSwitcher } from './ModeSwitcher';
import { Card, Button, SummaryReport } from '../shared';
import { exportToImage } from '../../utils/exportUtils';

type CalculationMode = 'detailed' | 'final';

interface CumulativeTabProps {
  darkMode: boolean;
  subjects: Subject[];
  isBaccalaureate: boolean;
  gradeHistory: SemesterRecord[];
  onAddSubject: () => void;
  onRemoveSubject: (id: string) => void;
  onUpdateSubject: (id: string, field: keyof Subject, value: string) => void;
  onClearAllSubjects: () => void;
  onAddToHistory: (name: string, gwa: number, subjectCount: number, subjectsData?: Subject[], finalGradesData?: QuickEntrySubject[], mode?: 'detailed' | 'final') => void;
  onRemoveFromHistory: (id: string) => void;
  selectedHistoryGWA: number | null;
  onClearSelectedHistory: () => void;
  onRestoreSubjects?: (subjects: Subject[]) => void;
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
  selectedHistoryGWA,
  onClearSelectedHistory,
  onRestoreSubjects
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [semesterName, setSemesterName] = useState('');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('detailed');
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);

  const [finalGradeSubjects, setFinalGradeSubjects] = useState<QuickEntrySubject[]>([]);

  const [showAddPastSemester, setShowAddPastSemester] = useState(false);
  const [pastSemName, setPastSemName] = useState('');
  const [pastSemGWA, setPastSemGWA] = useState('');
  const [pastSemSubjects, setPastSemSubjects] = useState('');

  const [exportRecord, setExportRecord] = useState<SemesterRecord | null>(null);

  React.useEffect(() => {
    if (exportRecord) {
      const timer = setTimeout(() => {
        exportToImage('history-export-target', `academic-report-${exportRecord.name.replace(/\s+/g, '-').toLowerCase()}`);
        setExportRecord(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [exportRecord]);

  const handleExportHistoryRecord = (record: SemesterRecord) => {
    setExportRecord(record);
  };

  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  const filteredHistory = useMemo(() => {
    return gradeHistory.filter(record => record.mode === calculationMode);
  }, [gradeHistory, calculationMode]);

  const detailedHistory = useMemo(() => {
    return gradeHistory.filter(record => record.mode === 'detailed');
  }, [gradeHistory]);

  const subjectResults = useMemo(() => {
    const results = new Map<string, ReturnType<typeof calculateSubjectGWA>>();
    subjects.forEach(s => {
      results.set(s.id, calculateSubjectGWA(s));
    });
    return results;
  }, [subjects]);

  const overallGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);

  const finalGradeGWA = useMemo(() => {
    const validGrades = finalGradeSubjects.filter(s => {
      const grade = typeof s.finalGrade === 'number' ? s.finalGrade : parseFloat(s.finalGrade as string);
      const units = typeof s.units === 'number' ? s.units : parseFloat(s.units as string);
      return !isNaN(grade) && !isNaN(units) && grade >= 1.00 && grade <= 5.00 && units > 0;
    });
    if (validGrades.length === 0) return null;

    const totalWeighted = validGrades.reduce((acc, s) => {
      const grade = typeof s.finalGrade === 'number' ? s.finalGrade : parseFloat(s.finalGrade as string);
      const units = typeof s.units === 'number' ? s.units : parseFloat(s.units as string);
      return acc + (grade * units);
    }, 0);
    const totalUnits = validGrades.reduce((acc, s) => {
      const units = typeof s.units === 'number' ? s.units : parseFloat(s.units as string);
      return acc + units;
    }, 0);

    if (totalUnits === 0) return null;
    return Math.round((totalWeighted / totalUnits) * 100) / 100;
  }, [finalGradeSubjects]);

  const currentGWA = calculationMode === 'detailed' ? overallGWA : finalGradeGWA;

  const completedSubjects = useMemo(() => {
    if (calculationMode === 'detailed') {
      return subjects.filter(s => calculateSubjectGWA(s)).length;
    } else {
      return finalGradeSubjects.filter(s => s.finalGrade !== '').length;
    }
  }, [subjects, finalGradeSubjects, calculationMode]);

  const cumulativeGWA = useMemo(() => {
    if (calculationMode !== 'detailed') return null;

    const historyWeightedGWA = detailedHistory.reduce((sum, r) => sum + (r.gwa * r.subjects), 0);
    const historySubjects = detailedHistory.reduce((sum, r) => sum + r.subjects, 0);

    const currentTermGWA = currentGWA;
    const currentTermSubjects = completedSubjects;

    if (historySubjects === 0 && currentTermSubjects === 0) return null;

    const totalWeightedGWA = historyWeightedGWA + (currentTermGWA ? currentTermGWA * currentTermSubjects : 0);
    const totalSubjects = historySubjects + currentTermSubjects;

    if (totalSubjects === 0) return null;

    return Math.round((totalWeightedGWA / totalSubjects) * 100) / 100;
  }, [detailedHistory, currentGWA, completedSubjects, calculationMode]);

  const hasTermViolation = useMemo(() => {
    if (completedSubjects === 0) return false;

    if (calculationMode === 'detailed') {
      for (const [, result] of subjectResults) {
        if (result && result.grade > 2.00) return true;
      }
      return false;
    } else {
      return finalGradeSubjects.some(s =>
        s.finalGrade !== '' && !isNaN(Number(s.finalGrade)) && Number(s.finalGrade) > 2.00
      );
    }
  }, [subjectResults, finalGradeSubjects, calculationMode, completedSubjects]);

  const hasGlobalViolation = useMemo(() => {
    if (hasTermViolation) return true;

    for (const record of gradeHistory) {
      if (record.mode === 'detailed') {
        const violation = record.subjectsData?.some(s => {
          const res = calculateSubjectGWA(s);
          return res && res.grade > 2.00;
        });
        if (violation) return true;
      } else if (record.mode === 'final') {
        const violation = record.finalGradesData?.some(s =>
          s.finalGrade !== '' && !isNaN(Number(s.finalGrade)) && Number(s.finalGrade) > 2.00
        );
        if (violation) return true;
      }
    }

    return false;
  }, [hasTermViolation, gradeHistory]);

  const honorClass = useMemo(() =>
    (currentGWA && !hasGlobalViolation) ? getHonorClass(currentGWA, isBaccalaureate) : null,
    [currentGWA, hasGlobalViolation, isBaccalaureate]
  );

  const hasAnyGrades = calculationMode === 'detailed'
    ? subjects.some(s => s.prelim !== '' || s.midterm !== '' || s.preFinal !== '' || s.finals !== '')
    : finalGradeSubjects.some(s => s.finalGrade !== '');

  const handleSaveToHistory = () => {
    if (currentGWA && completedSubjects > 0) {
      const name = semesterName.trim() || `Semester ${gradeHistory.length + 1}`;

      if (editingHistoryId) {
        const existingRecord = gradeHistory.find(r => r.id === editingHistoryId);
        if (existingRecord) {
          if (calculationMode === 'detailed') {
            onAddToHistory(name, currentGWA, completedSubjects, [...subjects], undefined, 'detailed');
          } else {
            onAddToHistory(name, currentGWA, completedSubjects, undefined, [...finalGradeSubjects], 'final');
          }
          onRemoveFromHistory(editingHistoryId);
          setEditingHistoryId(null);
        }
      } else {
        if (calculationMode === 'detailed') {
          onAddToHistory(name, currentGWA, completedSubjects, [...subjects], undefined, 'detailed');
        } else {
          onAddToHistory(name, currentGWA, completedSubjects, undefined, [...finalGradeSubjects], 'final');
        }
      }

      setSemesterName('');

      if (calculationMode === 'detailed') {
        onClearAllSubjects();
      } else {
        setFinalGradeSubjects([]);
      }
      onClearSelectedHistory();
    }
  };

  const handleAddPastSemester = () => {
    const gwa = parseFloat(pastSemGWA);
    const subjectCount = parseInt(pastSemSubjects);

    if (gwa >= 1.00 && gwa <= 5.00 && subjectCount > 0) {
      const name = pastSemName.trim() || `Past Semester ${gradeHistory.length + 1}`;
      onAddToHistory(name, Math.round(gwa * 100) / 100, subjectCount, undefined, undefined, 'detailed');
      setPastSemName('');
      setPastSemGWA('');
      setPastSemSubjects('');
      setShowAddPastSemester(false);
      setEditingHistoryId(null);
      setSemesterName('');
    }
  };

  const handleClearAll = () => {
    if (calculationMode === 'detailed') {
      onClearAllSubjects();
    } else {
      setFinalGradeSubjects([]);
    }
    onClearSelectedHistory();
  };

  const handleRestoreFromHistory = (record: SemesterRecord) => {
    if (record.mode === 'detailed' && record.subjectsData && onRestoreSubjects) {
      setCalculationMode('detailed');
      onRestoreSubjects(record.subjectsData);
      setEditingHistoryId(record.id);
      setSemesterName(record.name);
    } else if (record.mode === 'final' && record.finalGradesData) {
      setCalculationMode('final');
      setFinalGradeSubjects(record.finalGradesData);
      setEditingHistoryId(record.id);
      setSemesterName(record.name);
    }
    setShowHistory(false);
  };

  const handleAddFinalGradeSubject = () => {
    const newSubject: QuickEntrySubject = {
      id: Date.now().toString(),
      name: '',
      units: '',
      finalGrade: ''
    };
    setFinalGradeSubjects(prev => [...prev, newSubject]);
  };

  const handleRemoveFinalGradeSubject = (id: string) => {
    setFinalGradeSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateFinalGradeSubject = (id: string, field: keyof QuickEntrySubject, value: string | number) => {
    setFinalGradeSubjects(prev =>
      prev.map(s => s.id === id ? { ...s, [field]: value } : s)
    );
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    setEditingHistoryId(null);
    setSemesterName('');
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

      <ModeSwitcher
        mode={calculationMode}
        onModeChange={handleModeChange}
        darkMode={darkMode}
      />


      <OverallGWACard
        gwa={currentGWA}
        honorClass={honorClass}
        completedSubjects={completedSubjects}
        cumulativeGWA={cumulativeGWA}
        selectedHistoryGWA={selectedHistoryGWA}
        hasTermViolation={hasTermViolation}
        hasGlobalViolation={hasGlobalViolation}
        darkMode={darkMode}
        historyCount={filteredHistory.length}
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory(!showHistory)}
        mode={calculationMode}
        onExport={completedSubjects > 0 ? () => exportToImage('summary-report-export', 'academic-report') : undefined}
      />


      <GradeHistoryPanel
        isOpen={showHistory}
        gradeHistory={filteredHistory}
        onRemoveFromHistory={onRemoveFromHistory}
        onRestoreRecord={handleRestoreFromHistory}
        onExportRecord={handleExportHistoryRecord}
        darkMode={darkMode}
      />


      {calculationMode === 'detailed' ? (
        <SubjectList
          subjects={subjects}
          subjectResults={subjectResults}
          onUpdateSubject={onUpdateSubject}
          onRemoveSubject={onRemoveSubject}
          onAddSubject={onAddSubject}
          darkMode={darkMode}
        />
      ) : (
        <FinalGradesInput
          subjects={finalGradeSubjects}
          onAddSubject={handleAddFinalGradeSubject}
          onRemoveSubject={handleRemoveFinalGradeSubject}
          onUpdateSubject={handleUpdateFinalGradeSubject}
          darkMode={darkMode}
        />
      )}


      <SaveToHistoryPanel
        semesterName={semesterName}
        onSemesterNameChange={setSemesterName}
        onSave={handleSaveToHistory}
        canSave={currentGWA !== null && completedSubjects > 0}
        darkMode={darkMode}
        isEditing={editingHistoryId !== null}
      />


      {calculationMode === 'detailed' && (
        <section className="space-y-3">
          <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>
            Quick Add Past Semester
          </p>

          {!showAddPastSemester ? (
            <button
              onClick={() => setShowAddPastSemester(true)}
              className={`
              w-full py-3 rounded-xl border border-dashed
              ${darkMode ? 'border-[#1a1a1a] hover:border-[#333] hover:bg-[#0a0a0a]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
              ${textMuted} hover:${darkMode ? 'text-white' : 'text-gray-700'}
              transition-colors flex items-center justify-center gap-2 min-h-[48px]
              outline-none
            `}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Past Semester GWA</span>
            </button>
          ) : (
            <Card darkMode={darkMode} padding="md">
              <div className="space-y-3">
                <p className={`text-sm font-semibold ${textColor}`}>Add Previous Semester</p>

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
      )}


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

      <div className="absolute left-[-9999px] top-[-9999px]">
        <SummaryReport
          subjects={subjects}
          finalGradeSubjects={finalGradeSubjects}
          gwa={currentGWA}
          cumulativeGWA={cumulativeGWA}
          mode={calculationMode}
          isBaccalaureate={isBaccalaureate}
          darkMode={false}
          id="summary-report-export"
          hasGlobalViolation={hasGlobalViolation}
        />
      </div>


      {exportRecord && (
        <div className="absolute left-[-9999px] top-[-9999px]">
          <SummaryReport
            subjects={exportRecord.subjectsData || []}
            finalGradeSubjects={exportRecord.finalGradesData || []}
            gwa={exportRecord.gwa}
            mode={exportRecord.mode || 'detailed'}
            isBaccalaureate={isBaccalaureate}
            darkMode={false}
            studentName={exportRecord.name}
            id="history-export-target"
            hasGlobalViolation={hasGlobalViolation}
          />
        </div>
      )}
    </div>
  );
};
