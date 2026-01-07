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

// Grade options for dropdown (common Philippine grading system)
export const GRADE_OPTIONS = [
  1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 4.00, 5.00
] as const;

// Grade options with descriptions for professional dropdown display
export const GRADE_OPTIONS_WITH_DESC = [
  { value: 1.00, label: '1.00', description: 'Excellent' },
  { value: 1.25, label: '1.25', description: 'Excellent' },
  { value: 1.50, label: '1.50', description: 'Very Good' },
  { value: 1.75, label: '1.75', description: 'Very Good' },
  { value: 2.00, label: '2.00', description: 'Satisfactory' },
  { value: 2.25, label: '2.25', description: 'Satisfactory' },
  { value: 2.50, label: '2.50', description: 'Satisfactory' },
  { value: 2.75, label: '2.75', description: 'Fair' },
  { value: 3.00, label: '3.00', description: 'Fair' },
  { value: 4.00, label: '4.00', description: 'Conditional' },
  { value: 5.00, label: '5.00', description: 'Failed' }
] as const;

// Unit options for dropdown (integer units only)
export const UNIT_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

// Unit options with common course types
export const UNIT_OPTIONS_WITH_DESC = [
  { value: 1, label: '1', description: 'PE/NSTP' },
  { value: 2, label: '2', description: 'Lab' },
  { value: 3, label: '3', description: 'Lecture' },
  { value: 4, label: '4', description: 'Major' },
  { value: 5, label: '5', description: 'Major' },
  { value: 6, label: '6', description: 'Thesis' }
] as const;