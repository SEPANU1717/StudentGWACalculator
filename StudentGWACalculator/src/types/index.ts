export interface Subject {
  id: string;
  name: string;
  units: number | '';
  prelim: number | '';
  midterm: number | '';
  preFinal: number | '';
  finals: number | '';
}

export interface QuickEntrySubject {
  id: string;
  name: string;
  units: number | '';
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
  subjectsData?: Subject[];
  finalGradesData?: QuickEntrySubject[];
  mode?: 'detailed' | 'final';
}

export interface HonorsEligibility {
  deansListTerm: boolean;
  presidentsListCumulative: boolean;
  graduationHonor: string | null;
  graduationHonorAlt: string | null;
}