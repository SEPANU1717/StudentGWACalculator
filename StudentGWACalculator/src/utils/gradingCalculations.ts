import { Subject, GradeResult } from '../types';
import { WEIGHTS, GRADE_TABLE, PASSING_PERCENTAGE } from './constants';

export const percentageToGrade = (percentage: number): { grade: number; description: string } => {
  const entry = GRADE_TABLE.find(g => percentage >= g.min && percentage <= g.max);
  return entry 
    ? { grade: entry.grade, description: entry.description }
    : { grade: 5.00, description: 'Failed' };
};

export const calculatePartialPercentage = (subject: Subject): number | null => {
  const { prelim, midterm, preFinal, finals } = subject;
  let total = 0;
  let weightUsed = 0;
  
  if (prelim !== '') { total += (prelim as number) * WEIGHTS.prelim; weightUsed += WEIGHTS.prelim; }
  if (midterm !== '') { total += (midterm as number) * WEIGHTS.midterm; weightUsed += WEIGHTS.midterm; }
  if (preFinal !== '') { total += (preFinal as number) * WEIGHTS.preFinal; weightUsed += WEIGHTS.preFinal; }
  if (finals !== '') { total += (finals as number) * WEIGHTS.finals; weightUsed += WEIGHTS.finals; }
  
  return weightUsed === 0 ? null : total;
};

export const calculateSubjectGWA = (subject: Subject): GradeResult | null => {
  const { prelim, midterm, preFinal, finals } = subject;
  if (prelim === '' || midterm === '' || preFinal === '' || finals === '') return null;

  const percentage = 
    (prelim as number) * WEIGHTS.prelim +
    (midterm as number) * WEIGHTS.midterm +
    (preFinal as number) * WEIGHTS.preFinal +
    (finals as number) * WEIGHTS.finals;
  const roundedPercentage = Math.round(percentage * 100) / 100;
  const { grade, description } = percentageToGrade(roundedPercentage);
  return { percentage: roundedPercentage, grade, status: grade < 5.00 ? 'passed' : 'failed', description };
};

export const calculateOverallGWA = (subjects: Subject[]): number | null => {
  // Filter subjects with complete grades and valid units
  const validSubjects = subjects.filter(s => {
    const result = calculateSubjectGWA(s);
    const units = typeof s.units === 'number' ? s.units : parseFloat(s.units as string);
    return result !== null && !isNaN(units) && units > 0;
  });
  
  if (validSubjects.length === 0) return null;
  
  // Calculate weighted GWA by units
  let totalWeighted = 0;
  let totalUnits = 0;
  
  validSubjects.forEach(s => {
    const result = calculateSubjectGWA(s);
    const units = typeof s.units === 'number' ? s.units : parseFloat(s.units as string);
    if (result) {
      totalWeighted += result.grade * units;
      totalUnits += units;
    }
  });
  
  if (totalUnits === 0) return null;
  return Math.round((totalWeighted / totalUnits) * 100) / 100;
};

export const getGradeProgress = (subject: Subject) => {
  const { prelim, midterm, preFinal, finals } = subject;
  const filled: string[] = [];
  const remaining: string[] = [];
  let currentScore = 0;
  let remainingWeight = 0;

  if (prelim !== '') { filled.push('Prelim'); currentScore += (prelim as number) * WEIGHTS.prelim; } 
  else { remaining.push('Prelim'); remainingWeight += WEIGHTS.prelim; }
  if (midterm !== '') { filled.push('Midterm'); currentScore += (midterm as number) * WEIGHTS.midterm; } 
  else { remaining.push('Midterm'); remainingWeight += WEIGHTS.midterm; }
  if (preFinal !== '') { filled.push('Pre-Final'); currentScore += (preFinal as number) * WEIGHTS.preFinal; } 
  else { remaining.push('Pre-Final'); remainingWeight += WEIGHTS.preFinal; }
  if (finals !== '') { filled.push('Finals'); currentScore += (finals as number) * WEIGHTS.finals; } 
  else { remaining.push('Finals'); remainingWeight += WEIGHTS.finals; }

  return { filled: filled.length, filledNames: filled, remaining, currentScore, remainingWeight };
};

// Predict needed average for remaining grades to reach target
export const predictNeededGrade = (subject: Subject, targetPercentage: number): number | null => {
  const { filled, remainingWeight, currentScore } = getGradeProgress(subject);
  if (filled === 0 || filled === 4 || remainingWeight === 0) return null;
  const needed = (targetPercentage - currentScore) / remainingWeight;

  // Round up to 2 decimals initially
  let neededRounded = Math.max(0, Math.ceil(needed * 100) / 100);

  // Ensure that using the rounded value actually reaches the target after rounding to 2 decimals.
  // This guards against floating-point errors where a seemingly exact value (e.g. 12.90)
  // still produces a final percentage slightly below the target.
  const finalFor = (val: number) => Math.round((currentScore + val * remainingWeight) * 100) / 100;

  // If the rounded value doesn't reach the target, increment by 0.01 until it does (or exceeds 100).
  while (neededRounded <= 100) {
    if (finalFor(neededRounded) >= targetPercentage) return neededRounded;
    neededRounded = Math.round((neededRounded + 0.01) * 100) / 100;
  }

  return null;
};

export const predictToPass = (subject: Subject): number | null => predictNeededGrade(subject, PASSING_PERCENTAGE);

export const predictForTarget = (subject: Subject, targetGrade: number): number | null => {
  const gradeEntry = GRADE_TABLE.find(g => g.grade === targetGrade);
  return gradeEntry ? predictNeededGrade(subject, gradeEntry.min) : null;
};

// Calculate what-if GWA with simulated remaining grades (average for all remaining)
export const calculateWhatIfGWA = (subject: Subject, simulatedAverage: number): GradeResult | null => {
  const { prelim, midterm, preFinal, finals } = subject;
  const { filled, remaining } = getGradeProgress(subject);
  
  if (filled === 0 || filled === 4) return null;
  
  let percentage = 0;
  
  // Add filled grades
  if (prelim !== '') percentage += (prelim as number) * WEIGHTS.prelim;
  else percentage += simulatedAverage * WEIGHTS.prelim;
  
  if (midterm !== '') percentage += (midterm as number) * WEIGHTS.midterm;
  else percentage += simulatedAverage * WEIGHTS.midterm;
  
  if (preFinal !== '') percentage += (preFinal as number) * WEIGHTS.preFinal;
  else percentage += simulatedAverage * WEIGHTS.preFinal;
  
  if (finals !== '') percentage += (finals as number) * WEIGHTS.finals;
  else percentage += simulatedAverage * WEIGHTS.finals;
  
  const rounded = Math.round(percentage * 100) / 100;
  const pg = percentageToGrade(rounded);
  return { 
    percentage: rounded, 
    grade: pg.grade, 
    status: pg.grade < 5.00 ? 'passed' : 'failed', 
    description: pg.description,
    remaining 
  };
};

export const getHonorClass = (gwa: number, isBaccalaureate: boolean = true): string | null => {
  if (isBaccalaureate) {
    if (gwa >= 1.00 && gwa <= 1.10) return 'Summa Cum Laude';
    if (gwa >= 1.11 && gwa <= 1.30) return 'Magna Cum Laude';
    if (gwa >= 1.31 && gwa <= 1.50) return 'Cum Laude';
  } else {
    if (gwa >= 1.00 && gwa <= 1.10) return 'With Highest Honors';
    if (gwa >= 1.11 && gwa <= 1.30) return 'With High Honors';
    if (gwa >= 1.31 && gwa <= 1.50) return 'With Honors';
  }
  return null;
};

export const isDeansListEligible = (termGwa: number): boolean => termGwa >= 1.00 && termGwa <= 1.50;
export const isPresidentsListEligible = (cumulativeGwa: number): boolean => cumulativeGwa >= 1.00 && cumulativeGwa <= 1.50;
export const getTuitionDiscount = (gwa: number): number => {
  if (gwa >= 1.00 && gwa <= 1.10) return 100;
  if (gwa >= 1.11 && gwa <= 1.30) return 50;
  if (gwa >= 1.31 && gwa <= 1.50) return 25;
  return 0;
};
