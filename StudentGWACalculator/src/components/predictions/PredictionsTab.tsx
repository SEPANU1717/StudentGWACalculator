import React, { useMemo } from 'react';
import { Subject } from '../../types';
import {
  calculateSubjectGWA,
  calculatePartialPercentage,
  calculateWhatIfGWA,
  getGradeProgress,
  predictToPass,
  predictForTarget
} from '../../utils/gradingCalculations';

import { CurrentStatusCard } from './CurrentStatusCard';
import { QuickStatsGrid } from './QuickStatsGrid';
import { ScenariosTable } from './ScenariosTable';
import { CompletionCard } from './CompletionCard';
import { EmptyState } from './EmptyState';

interface PredictionsTabProps {
  darkMode: boolean;
  singleSubject: Subject;
  targetGrade: number;
  canPredict: boolean;
}

export const PredictionsTab: React.FC<PredictionsTabProps> = ({
  darkMode,
  singleSubject,
  targetGrade
}) => {
  // Calculations
  const singleResult = useMemo(() => calculateSubjectGWA(singleSubject), [singleSubject]);
  const partialPercentage = useMemo(() => calculatePartialPercentage(singleSubject), [singleSubject]);
  const progress = useMemo(() => getGradeProgress(singleSubject), [singleSubject]);
  const toPass = useMemo(() => predictToPass(singleSubject), [singleSubject]);
  const toTarget = useMemo(() => predictForTarget(singleSubject, targetGrade), [singleSubject, targetGrade]);

  const hasAllGrades = progress.filled === 4;
  const canPredict = progress.filled >= 1 && progress.filled < 4;

  // Grade scenarios
  const scenarios = useMemo(() => {
    if (!canPredict) return [];
    const scores = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    return scores.map(score => {
      const result = calculateWhatIfGWA(singleSubject, score);
      return { score, result };
    }).filter(s => s.result !== null);
  }, [singleSubject, canPredict]);

  // Progress info
  const progressInfo = useMemo(() => {
    if (progress.filled === 0) return null;
    const usedWeight = (1 - progress.remainingWeight) * 100;
    return {
      accumulated: progress.currentScore,
      usedWeight,
      remainingWeight: progress.remainingWeight * 100
    };
  }, [progress]);

  return (
    <div 
      className="space-y-6"
      role="tabpanel"
      id="predictions-panel"
      aria-labelledby="predictions-tab"
    >
      {/* Current Status Card */}
      <CurrentStatusCard
        filledCount={progress.filled}
        singleResult={singleResult}
        partialPercentage={partialPercentage}
        remainingWeight={progressInfo?.remainingWeight ?? 0}
        darkMode={darkMode}
      />

      {/* Quick Stats Grid */}
      {canPredict && (
        <QuickStatsGrid
          toPass={toPass}
          toTarget={toTarget}
          targetGrade={targetGrade}
          canPredict={canPredict}
          darkMode={darkMode}
        />
      )}

      {/* Scenarios Table */}
      {canPredict && scenarios.length > 0 && (
        <ScenariosTable
          scenarios={scenarios}
          darkMode={darkMode}
        />
      )}

      {/* All Grades Complete */}
      {hasAllGrades && singleResult && (
        <CompletionCard
          result={singleResult}
          darkMode={darkMode}
        />
      )}

      {/* Empty State */}
      {progress.filled === 0 && (
        <EmptyState darkMode={darkMode} />
      )}
    </div>
  );
};
