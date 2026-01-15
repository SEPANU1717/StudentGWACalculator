import React, { useMemo, useState } from 'react';
import { Subject } from '../../types';
import {
  calculateSubjectGWA,
  calculatePartialPercentage,
  predictToPass,
  predictForTarget,
  calculateWhatIfGWA,
  isDeansListEligible,
  getGradeProgress
} from '../../utils/gradingCalculations';

import { GradeTable } from './GradeTable';
import { GradeInputGrid } from './GradeInputGrid';
import { GWAResultCard } from './GWAResultCard';
import { WhatIfSimulator } from './WhatIfSimulator';
import { PredictionCards } from './PredictionCards';
import { SettingsPanel } from './SettingsPanel';

interface CalculatorTabProps {
  darkMode: boolean;
  singleSubject: Subject;
  targetGrade: number;
  showSettings: boolean;
  showGradeTable: boolean;
  selectedHistoryGWA: number | null;
  onUpdateSingleSubject: (field: keyof Subject, value: string) => void;
  onSetTargetGrade: (grade: number) => void;
  onToggleSettings: () => void;
  onToggleGradeTable: () => void;
  onClearSelectedHistory: () => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  darkMode,
  singleSubject,
  targetGrade,
  showSettings,
  showGradeTable,
  selectedHistoryGWA,
  onUpdateSingleSubject,
  onSetTargetGrade,
  onToggleSettings,
  onToggleGradeTable,
  onClearSelectedHistory
}) => {
  const [simulatedFinals, setSimulatedFinals] = useState<number>(75);
  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';

  // Memoized calculations
  const singleResult = useMemo(() => calculateSubjectGWA(singleSubject), [singleSubject]);
  const partialPercentage = useMemo(() => calculatePartialPercentage(singleSubject), [singleSubject]);
  const toPass = useMemo(() => predictToPass(singleSubject), [singleSubject]);
  const toTarget = useMemo(() => predictForTarget(singleSubject, targetGrade), [singleSubject, targetGrade]);
  const whatIfResult = useMemo(() => calculateWhatIfGWA(singleSubject, simulatedFinals), [singleSubject, simulatedFinals]);
  const progress = useMemo(() => getGradeProgress(singleSubject), [singleSubject]);

  const hasAllGrades = progress.filled === 4;
  const canPredict = progress.filled >= 1 && progress.filled < 4;
  const showWhatIf = progress.filled === 3 && !hasAllGrades;

  const deansEligible = singleResult ? isDeansListEligible(singleResult.grade) : false;

  // Clear selected history when user starts typing new grades
  const hasAnyInput = progress.filled > 0;
  const useSelectedHistory = selectedHistoryGWA !== null && !hasAnyInput;

  const displayPercentage = singleResult
    ? singleResult.percentage
    : partialPercentage;

  return (
    <div
      className="space-y-6"
      role="tabpanel"
      id="calculator-panel"
      aria-labelledby="calculator-tab"
    >
      {/* GWA Result Card */}
      <GWAResultCard
        percentage={displayPercentage}
        result={singleResult}
        isPartial={partialPercentage !== null && !singleResult}
        filledCount={progress.filled}
        remainingGrades={progress.remaining}
        isDeansListEligible={deansEligible}
        darkMode={darkMode}
        selectedHistoryGWA={useSelectedHistory ? selectedHistoryGWA : null}
        onClearSelectedHistory={onClearSelectedHistory}
      />

      {/* Grade Inputs Section */}
      <section>
        <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider mb-3`}>
          Enter Grades
        </p>
        <GradeInputGrid
          subject={singleSubject}
          onUpdateSubject={onUpdateSingleSubject}
          darkMode={darkMode}
        />
      </section>

      {/* Prediction Cards */}
      {canPredict && (
        <PredictionCards
          hasAllGrades={hasAllGrades}
          canPredict={canPredict}
          toTarget={toTarget}
          toPass={toPass}
          darkMode={darkMode}
        />
      )}

      {/* What-If Simulator (shows when 3 grades are filled) */}
      {showWhatIf && (
        <WhatIfSimulator
          remainingGrade={progress.remaining[0]}
          simulatedValue={simulatedFinals}
          onSimulatedValueChange={setSimulatedFinals}
          whatIfResult={whatIfResult}
          darkMode={darkMode}
        />
      )}

      {/* Tools Section */}
      <section className="space-y-3">
        <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>
          Tools
        </p>

        {/* Grade Table */}
        <GradeTable
          isOpen={showGradeTable}
          onToggle={onToggleGradeTable}
          darkMode={darkMode}
        />

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={showSettings}
          onToggle={onToggleSettings}
          targetGrade={targetGrade}
          onSetTargetGrade={onSetTargetGrade}
          darkMode={darkMode}
        />
      </section>
    </div>
  );
};
