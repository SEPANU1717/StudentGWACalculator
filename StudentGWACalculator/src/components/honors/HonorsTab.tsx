import React, { useMemo, useState } from 'react';
import { Subject, SemesterRecord } from '../../types';
import {
  calculateOverallGWA,
  getHonorClass,
  isDeansListEligible,
  isPresidentsListEligible,
  calculateSubjectGWA
} from '../../utils/gradingCalculations';

import { HonorsHeader } from './HonorsHeader';
import { GWAOverviewCards } from './GWAOverviewCards';
import { GraduationHonorsTable } from './GraduationHonorsTable';
import { EligibilityRequirements } from './EligibilityRequirements';
import { EmptyState } from './EmptyState';

interface HonorsTabProps {
  darkMode: boolean;
  subjects: Subject[];
  gradeHistory: SemesterRecord[];
  isBaccalaureate: boolean;
  onSetIsBaccalaureate: (value: boolean) => void;
  selectedHistoryGWA?: number | null;
}

export const HonorsTab: React.FC<HonorsTabProps> = ({
  darkMode,
  subjects,
  gradeHistory,
  isBaccalaureate,
  onSetIsBaccalaureate,
  selectedHistoryGWA
}) => {
  const [showRequirements, setShowRequirements] = useState(false);

  const computedGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);
  const currentGWA = computedGWA ?? selectedHistoryGWA ?? null;

  const cumulativeGWA = useMemo(() => {
    const allRecords = [...gradeHistory];
    if (currentGWA) {
      const completedSubjects = subjects.filter(s => calculateSubjectGWA(s)).length;
      if (completedSubjects > 0) {
        allRecords.push({
          id: 'current',
          name: 'Current',
          gwa: currentGWA,
          subjects: completedSubjects,
          date: ''
        });
      }
    }
    if (allRecords.length === 0) return null;
    const totalWeightedGWA = allRecords.reduce((sum, r) => sum + (r.gwa * r.subjects), 0);
    const totalSubjects = allRecords.reduce((sum, r) => sum + r.subjects, 0);
    return totalSubjects > 0 ? totalWeightedGWA / totalSubjects : null;
  }, [gradeHistory, currentGWA, subjects]);

  const hasTermViolation = useMemo(() => {
    return subjects.some(s => {
      const res = calculateSubjectGWA(s);
      return res && res.grade > 2.00;
    });
  }, [subjects]);

  const hasGlobalViolation = useMemo(() => {
    if (hasTermViolation) return true;

    for (const record of gradeHistory) {
      if (record.mode === 'detailed') {
        const violation = record.subjectsData?.some(s => {
          const res = calculateSubjectGWA(s);
          return res && res.grade > 2.00;
        });
        if (violation) return true;
      } else {
        const violation = record.finalGradesData?.some(s =>
          s.finalGrade !== '' && !isNaN(Number(s.finalGrade)) && Number(s.finalGrade) > 2.00
        );
        if (violation) return true;
      }
    }

    return false;
  }, [hasTermViolation, gradeHistory]);

  const deansListEligible = (currentGWA && !hasTermViolation) ? isDeansListEligible(currentGWA) : false;
  const presidentsListEligible = (cumulativeGWA && !hasGlobalViolation) ? isPresidentsListEligible(cumulativeGWA) : false;
  const graduationHonor = (cumulativeGWA && !hasGlobalViolation) ? getHonorClass(cumulativeGWA, isBaccalaureate) : null;

  const hasData = currentGWA !== null || cumulativeGWA !== null;

  return (
    <div
      className="space-y-6"
      role="tabpanel"
      id="honors-panel"
      aria-labelledby="honors-tab"
    >

      <HonorsHeader
        isBaccalaureate={isBaccalaureate}
        onSetIsBaccalaureate={onSetIsBaccalaureate}
        darkMode={darkMode}
      />


      {!hasData && (
        <EmptyState darkMode={darkMode} />
      )}


      {hasData && (
        <>
          {hasGlobalViolation && (
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'} flex items-center justify-center gap-3 text-sm font-bold mb-6 shadow-sm`}>
              <span className="text-xl">⚠</span>
              <span>Graduation Honors Disqualified: Grade &gt; 2.00 detected in residency.</span>
            </div>
          )}
          {!hasGlobalViolation && hasTermViolation && (
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'} flex items-center justify-center gap-3 text-sm font-bold mb-6 shadow-sm`}>
              <span className="text-xl">⚠</span>
              <span>Term Honors Disqualified: Current grade &gt; 2.00 detected.</span>
            </div>
          )}
          <GWAOverviewCards
            termGWA={currentGWA}
            cumulativeGWA={cumulativeGWA}
            deansListEligible={deansListEligible}
            presidentsListEligible={presidentsListEligible}
            darkMode={darkMode}
          />
        </>
      )}


      <GraduationHonorsTable
        isBaccalaureate={isBaccalaureate}
        graduationHonor={graduationHonor}
        darkMode={darkMode}
      />


      <EligibilityRequirements
        isOpen={showRequirements}
        onToggle={() => setShowRequirements(!showRequirements)}
        darkMode={darkMode}
      />
    </div>
  );
};
