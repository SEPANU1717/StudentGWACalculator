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

  // Calculate current term GWA - use computed or selected history
  const computedGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);
  const currentGWA = computedGWA ?? selectedHistoryGWA ?? null;
  
  // Calculate cumulative GWA including history
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

  // Eligibility checks
  const deansListEligible = currentGWA ? isDeansListEligible(currentGWA) : false;
  const presidentsListEligible = cumulativeGWA ? isPresidentsListEligible(cumulativeGWA) : false;
  const graduationHonor = cumulativeGWA ? getHonorClass(cumulativeGWA, isBaccalaureate) : null;

  const hasData = currentGWA !== null || cumulativeGWA !== null;

  return (
    <div 
      className="space-y-6"
      role="tabpanel"
      id="honors-panel"
      aria-labelledby="honors-tab"
    >
      {/* Section Header */}
      <HonorsHeader
        isBaccalaureate={isBaccalaureate}
        onSetIsBaccalaureate={onSetIsBaccalaureate}
        darkMode={darkMode}
      />

      {/* Empty State */}
      {!hasData && (
        <EmptyState darkMode={darkMode} />
      )}

      {/* GWA Overview Cards */}
      {hasData && (
        <GWAOverviewCards
          termGWA={currentGWA}
          cumulativeGWA={cumulativeGWA}
          deansListEligible={deansListEligible}
          presidentsListEligible={presidentsListEligible}
          darkMode={darkMode}
        />
      )}

      {/* Graduation Honors Table */}
      <GraduationHonorsTable
        isBaccalaureate={isBaccalaureate}
        graduationHonor={graduationHonor}
        darkMode={darkMode}
      />

      {/* Eligibility Requirements */}
      <EligibilityRequirements
        isOpen={showRequirements}
        onToggle={() => setShowRequirements(!showRequirements)}
        darkMode={darkMode}
      />
    </div>
  );
};
