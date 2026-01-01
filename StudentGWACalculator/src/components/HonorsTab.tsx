import React, { useMemo, useState } from 'react';
import { Award, Trophy, GraduationCap, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Subject, SemesterRecord } from '../types';
import { 
  calculateOverallGWA, 
  getHonorClass, 
  isDeansListEligible, 
  isPresidentsListEligible,
  getTuitionDiscount,
  calculateSubjectGWA
} from '../utils/gradingCalculations';

interface HonorsTabProps {
  darkMode: boolean;
  subjects: Subject[];
  gradeHistory: SemesterRecord[];
  isBaccalaureate: boolean;
  onSetIsBaccalaureate: (value: boolean) => void;
}

export const HonorsTab: React.FC<HonorsTabProps> = ({
  darkMode,
  subjects,
  gradeHistory,
  isBaccalaureate,
  onSetIsBaccalaureate
}) => {
  const [showRequirements, setShowRequirements] = useState(false);

  const currentGWA = useMemo(() => calculateOverallGWA(subjects), [subjects]);
  
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

  const deansListEligible = currentGWA ? isDeansListEligible(currentGWA) : false;
  const presidentsListEligible = cumulativeGWA ? isPresidentsListEligible(cumulativeGWA) : false;
  const graduationHonor = cumulativeGWA ? getHonorClass(cumulativeGWA, isBaccalaureate) : null;
  const tuitionDiscount = cumulativeGWA ? getTuitionDiscount(cumulativeGWA) : 0;

  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const inputBg = darkMode ? 'bg-[#000]' : 'bg-gray-50';

  const honorRequirements = [
    { gwa: '1.00 - 1.10', bacc: 'Summa Cum Laude', other: 'With Highest Honors', discount: '100%' },
    { gwa: '1.11 - 1.30', bacc: 'Magna Cum Laude', other: 'With High Honors', discount: '50%' },
    { gwa: '1.31 - 1.50', bacc: 'Cum Laude', other: 'With Honors', discount: '25%' }
  ];

  const eligibilityRequirements = [
    'No grade lower than 2.00 in any course',
    'At least 75% of units taken at STI',
    'No record of major offense',
    'Not enrolled in OJT/Practicum/Thesis only',
    'No DRP in all study loads',
    'No failing grade in all courses'
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <span className={`text-xs uppercase tracking-wider font-medium ${textMuted}`}>Honors Eligibility</span>
        <select
          value={isBaccalaureate ? 'bacc' : 'other'}
          onChange={(e) => onSetIsBaccalaureate(e.target.value === 'bacc')}
          className={`${inputBg} border ${border} rounded-lg px-2 py-1 text-xs font-medium outline-none ${textColor}`}
        >
          <option value="bacc">Baccalaureate</option>
          <option value="other">Non-Baccalaureate</option>
        </select>
      </div>

      {/* Current Status Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-2`}>TERM GWA</div>
          <div className={`text-2xl font-bold ${textColor}`}>
            {currentGWA ? currentGWA.toFixed(2) : 'N/A'}
          </div>
          {currentGWA !== null && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
              deansListEligible ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {deansListEligible ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              Dean's List
            </div>
          )}
        </div>

        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-2`}>CUMULATIVE</div>
          <div className={`text-2xl font-bold ${textColor}`}>
            {cumulativeGWA ? cumulativeGWA.toFixed(2) : 'N/A'}
          </div>
          {cumulativeGWA !== null && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
              presidentsListEligible ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {presidentsListEligible ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              President's List
            </div>
          )}
        </div>
      </div>

      {/* Dean's List Card */}
      <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            deansListEligible ? 'bg-yellow-500/15' : darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
          }`}>
            <Award className={`w-5 h-5 ${deansListEligible ? 'text-yellow-400' : textMuted}`} />
          </div>
          <div className="flex-1">
            <div className={`text-sm font-medium ${textColor}`}>Dean's List</div>
            <div className={`text-xs ${textMuted}`}>Term GWA of 1.50 or higher</div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            deansListEligible 
              ? 'bg-emerald-500/15 text-emerald-400' 
              : 'bg-red-500/15 text-red-400'
          }`}>
            {deansListEligible ? 'Qualified' : 'Not Qualified'}
          </div>
        </div>
      </div>

      {/* President's List Card */}
      <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            presidentsListEligible ? 'bg-yellow-500/15' : darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
          }`}>
            <Trophy className={`w-5 h-5 ${presidentsListEligible ? 'text-yellow-400' : textMuted}`} />
          </div>
          <div className="flex-1">
            <div className={`text-sm font-medium ${textColor}`}>President's List</div>
            <div className={`text-xs ${textMuted}`}>Cumulative GWA of 1.50 or higher</div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            presidentsListEligible 
              ? 'bg-emerald-500/15 text-emerald-400' 
              : 'bg-red-500/15 text-red-400'
          }`}>
            {presidentsListEligible ? 'Qualified' : 'Not Qualified'}
          </div>
        </div>
      </div>

      {/* Graduation Honors Table */}
      <div className={`${cardBg} rounded-xl border ${border} overflow-hidden`}>
        <div className={`px-4 py-3 border-b ${border} flex items-center gap-3`}>
          <GraduationCap className={`w-4 h-4 ${graduationHonor ? 'text-yellow-400' : textMuted}`} />
          <span className={`text-xs font-medium ${textMuted}`}>GRADUATION HONORS</span>
          {graduationHonor && (
            <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-400">
              {graduationHonor}
            </span>
          )}
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${border} ${inputBg}`}>
              <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>GWA</th>
              <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>
                {isBaccalaureate ? 'Latin Honors' : 'English Honors'}
              </th>
              <th className={`px-4 py-2.5 text-right text-xs font-medium ${textMuted}`}>Discount</th>
            </tr>
          </thead>
          <tbody className={darkMode ? 'divide-y divide-[#1a1a1a]' : 'divide-y divide-gray-100'}>
            {honorRequirements.map((req, i) => {
              const isCurrentHonor = graduationHonor === (isBaccalaureate ? req.bacc : req.other);
              return (
                <tr key={i} className={isCurrentHonor ? 'bg-yellow-500/10' : ''}>
                  <td className={`px-4 py-2.5 font-semibold ${textColor}`}>{req.gwa}</td>
                  <td className={`px-4 py-2.5 font-medium ${isCurrentHonor ? 'text-yellow-400' : textColor}`}>
                    {isBaccalaureate ? req.bacc : req.other}
                  </td>
                  <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold">{req.discount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tuition Discount */}
      {tuitionDiscount > 0 && (
        <div className={`${cardBg} rounded-xl p-4 border border-emerald-500/30`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/15">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${textColor}`}>Tuition Discount</div>
              <div className={`text-xs ${textMuted}`}>For succeeding term</div>
            </div>
            <div className="text-2xl font-bold text-emerald-400">{tuitionDiscount}%</div>
          </div>
        </div>
      )}

      {/* Requirements - Collapsible */}
      <button
        onClick={() => setShowRequirements(!showRequirements)}
        className={`w-full ${cardBg} rounded-xl p-4 border ${border} flex items-center justify-between transition-colors`}
      >
        <span className={`text-sm font-medium ${textColor}`}>Eligibility Requirements</span>
        {showRequirements ? (
          <ChevronUp className={`w-4 h-4 ${textMuted}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${textMuted}`} />
        )}
      </button>

      {showRequirements && (
        <div className={`${cardBg} rounded-xl p-4 border ${border} animate-scaleIn`}>
          <div className="space-y-2">
            {eligibilityRequirements.map((req, i) => (
              <div key={i} className={`flex items-start gap-3 text-sm ${textMuted}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} ${textColor}`}>
                  {i + 1}
                </span>
                <span className="flex-1">{req}</span>
              </div>
            ))}
          </div>
          <div className={`mt-4 pt-3 border-t ${border} text-xs ${textMuted}`}>
            Note: Grade requirement applies to students from SY 2025-2026.
          </div>
        </div>
      )}

      {/* No Data Message */}
      {!currentGWA && !cumulativeGWA && (
        <div className={`${cardBg} rounded-xl p-6 border ${border} text-center`}>
          <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
            <GraduationCap className={`w-6 h-6 ${textMuted}`} />
          </div>
          <div className={`text-sm font-medium mb-2 ${textColor}`}>No Grades Yet</div>
          <div className={`text-xs ${textMuted}`}>
            Enter grades in Calculator or Cumulative tab
          </div>
        </div>
      )}
    </div>
  );
};
