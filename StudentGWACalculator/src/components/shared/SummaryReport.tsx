import React from 'react';
import { Subject, QuickEntrySubject } from '../../types';
import { calculateSubjectGWA, isDeansListEligible, isPresidentsListEligible, getTuitionDiscount, getHonorClass } from '../../utils/gradingCalculations';
import { Award, Star, GraduationCap, Calendar, Trophy } from 'lucide-react';

interface SummaryReportProps {
    subjects?: Subject[];
    finalGradeSubjects?: QuickEntrySubject[];
    gwa: number | null;
    mode: 'detailed' | 'final';
    darkMode?: boolean;
    studentName?: string;
    cumulativeGWA?: number | null;
    isBaccalaureate?: boolean;
    id?: string;
    hasGlobalViolation?: boolean;
}

export const SummaryReport: React.FC<SummaryReportProps> = ({
    subjects = [],
    finalGradeSubjects = [],
    gwa,
    mode,
    cumulativeGWA,
    isBaccalaureate = true,
    hasGlobalViolation: providedGlobalViolation,
    id
}) => {
    const bg = 'bg-white';
    const text = 'text-gray-900';


    const hasTermViolation = mode === 'detailed'
        ? subjects.some(s => {
            const res = calculateSubjectGWA(s);
            return res && res.grade > 2.00;
        })
        : finalGradeSubjects.some(s => s.finalGrade !== '' && !isNaN(Number(s.finalGrade)) && Number(s.finalGrade) > 2.00);

    const hasGlobalViolation = providedGlobalViolation ?? hasTermViolation;

    const deansEligible = (gwa && !hasTermViolation) ? isDeansListEligible(gwa) : false;
    const presidentsEligible = (gwa && !hasGlobalViolation) ? isPresidentsListEligible(gwa) : false;
    const honorClass = (gwa && !hasGlobalViolation) ? getHonorClass(gwa, isBaccalaureate) : null;
    const discount = (gwa && !hasTermViolation) ? getTuitionDiscount(gwa) : 0;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const validSubjects = mode === 'detailed'
        ? subjects.filter(s => s.name || (s.prelim || s.midterm || s.preFinal || s.finals))
        : finalGradeSubjects.filter(s => s.name || s.finalGrade);

    const hasAnyProcessedGrades = validSubjects.some(s => {
        if (mode === 'detailed') return calculateSubjectGWA(s as Subject);
        const g = (s as QuickEntrySubject).finalGrade;
        return g !== '' && !isNaN(Number(g));
    });

    return (
        <div id={id || "summary-report-export"} className={`w-[800px] ${bg} p-8 rounded-none sm:rounded-xl shadow-none mx-auto`}>

            <div className="flex justify-between items-center border-b-2 border-emerald-500 pb-5 mb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-600 p-2.5 rounded-lg shadow-sm">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className={`text-2xl font-bold ${text} tracking-tight leading-none`}>STUDENT GRADE REPORT</h1>
                        <p className="text-emerald-700 font-medium text-xs mt-1 uppercase tracking-widest">Student GWA Calculator Generated</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg">
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date Generated</div>
                        <div className={`text-sm font-semibold ${text} flex items-center justify-end gap-2`}>
                            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                            {dateStr}
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">

                <div className="grid grid-cols-4 gap-6 text-center">
                    <div className="p-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Term GWA</div>
                        <div className={`text-3xl font-black ${text} tabular-nums text-emerald-700`}>
                            {gwa ? gwa.toFixed(2) : '—'}
                        </div>
                    </div>

                    <div className="p-3 border-l border-gray-200">
                        {mode === 'detailed' && cumulativeGWA ? (
                            <>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cumulative GWA</div>
                                <div className={`text-3xl font-black ${text} tabular-nums text-emerald-600`}>
                                    {cumulativeGWA.toFixed(2)}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Units</div>
                                <div className={`text-3xl font-black ${text}`}>
                                    {validSubjects.reduce((acc, s) => acc + (Number(s.units) || 0), 0)}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-3 border-l border-gray-200">
                        {mode === 'detailed' && cumulativeGWA ? (
                            <>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Units</div>
                                <div className={`text-3xl font-black ${text}`}>
                                    {validSubjects.reduce((acc, s) => acc + (Number(s.units) || 0), 0)}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Subjects</div>
                                <div className={`text-3xl font-black ${text}`}>
                                    {validSubjects.length}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-3 border-l border-gray-200">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Remarks</div>
                        <div className="flex flex-col items-center justify-center min-h-[40px]">
                            {honorClass ? (
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded inline-flex items-center gap-1.5 shadow-sm">
                                    <Trophy className="w-3.5 h-3.5" /> {honorClass}
                                </span>
                            ) : presidentsEligible ? (
                                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded inline-flex items-center gap-1"><Star className="w-3 h-3" /> President's List</span>
                            ) : deansEligible ? (
                                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded inline-flex items-center gap-1"><Award className="w-3 h-3" /> Dean's List</span>
                            ) : (
                                <span className="text-xs font-bold text-gray-400 italic">
                                    {hasAnyProcessedGrades ? (hasTermViolation ? 'No Honors' : 'Passed') : '—'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {(cumulativeGWA || (mode === 'detailed' && hasGlobalViolation)) && (
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center gap-8 text-xs font-medium">
                        {cumulativeGWA && (
                            <div className="text-gray-500">Cumulative GWA: <span className="text-emerald-700 font-bold">{cumulativeGWA.toFixed(2)}</span></div>
                        )}
                        {hasGlobalViolation && (
                            <div className="text-amber-600 flex items-center gap-1.5">
                                <span>⚠ Grade &gt; 2.00 detected</span>
                                <span className="bg-amber-100 px-2 py-0.5 rounded text-[10px] font-bold">Disqualified for Honors</span>
                            </div>
                        )}
                    </div>
                )}


                {discount > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center">
                        <span className="text-emerald-700 font-bold text-sm bg-emerald-100/50 px-4 py-1.5 rounded-full border border-emerald-100">
                            Eligible for {discount}% Tuition Discount by Term GWA
                        </span>
                    </div>
                )}
            </div>


            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3">Subject</th>
                            <th className="px-4 py-3 text-center w-24">Units</th>
                            <th className="px-4 py-3 text-center w-32">Final Grade</th>
                            <th className="px-4 py-3 text-center w-32">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {validSubjects.map((s, i) => {
                            let finalGrade: number | null = null;

                            if (mode === 'detailed') {
                                const res = calculateSubjectGWA(s as Subject);
                                finalGrade = res ? res.grade : null;
                            } else {
                                finalGrade = Number((s as QuickEntrySubject).finalGrade) || null;
                            }

                            const status = finalGrade ? (finalGrade <= 3.00 ? 'Passed' : 'Failed') : '—';
                            const statusColor = status === 'Passed' ? 'text-emerald-600 bg-emerald-50' : (status === 'Failed' ? 'text-red-600 bg-red-50' : 'text-gray-400 bg-gray-50');

                            return (
                                <tr key={s.id} className="hover:bg-gray-50/50">
                                    <td className={`px-4 py-3 font-medium ${text}`}>
                                        {s.name || `Subject ${i + 1}`}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                        {s.units || '—'}
                                    </td>
                                    <td className={`px-4 py-3 text-center font-bold ${text}`}>
                                        {finalGrade ? finalGrade.toFixed(2) : '—'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColor}`}>
                                            {status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {validSubjects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-400 italic">
                                    No subjects entered yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <div>
                    Generated by <span className="font-semibold text-emerald-600">Sepanode Calculator</span>
                </div>
                <div>
                    Not an official document
                </div>
            </div>
        </div >
    );
};
