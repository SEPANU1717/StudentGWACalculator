import { GradeTableEntry } from '../types';

export const WEIGHTS = {
  prelim: 0.20,
  midterm: 0.20,
  preFinal: 0.20,
  finals: 0.40
} as const;

export const GRADE_TABLE: GradeTableEntry[] = [
  { grade: 1.00, min: 97.50, max: 100.00, description: 'Excellent' },
  { grade: 1.25, min: 94.50, max: 97.49, description: 'Excellent' },
  { grade: 1.50, min: 91.50, max: 94.49, description: 'Very Good' },
  { grade: 1.75, min: 86.50, max: 91.49, description: 'Very Good' },
  { grade: 2.00, min: 81.50, max: 86.49, description: 'Satisfactory' },
  { grade: 2.25, min: 76.00, max: 81.49, description: 'Satisfactory' },
  { grade: 2.50, min: 70.50, max: 75.99, description: 'Satisfactory' },
  { grade: 2.75, min: 65.00, max: 70.49, description: 'Fair' },
  { grade: 3.00, min: 59.50, max: 64.99, description: 'Fair' },
  { grade: 5.00, min: 0.00, max: 59.49, description: 'Failed' }
] as const;

export const PASSING_PERCENTAGE = 59.50;