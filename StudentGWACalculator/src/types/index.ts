export interface Subject {
  id: string;
  name: string;
  prelim: number | '';
  midterm: number | '';
  preFinal: number | '';
  finals: number | '';
}

// For quick entry of past semester final grades
export interface QuickEntrySubject {
  id: string;
  name: string;
  finalGrade: number | '';
}

export interface GradeResult {
  percentage: number;
  grade: number;
  status: 'passed' | 'failed';
  description: string;
  remaining?: string[];
}

export interface GradeTableEntry {
  grade: number;
  min: number;
  max: number;
  description: string;
}

export interface SemesterRecord {
  id: string;
  name: string;
  gwa: number;
  subjects: number;
  date: string;
}

export interface HonorsEligibility {
  deansListTerm: boolean;
  presidentsListCumulative: boolean;
  graduationHonor: string | null;
  graduationHonorAlt: string | null;
}