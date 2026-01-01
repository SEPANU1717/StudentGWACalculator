import { useMemo, useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { Subject } from '../types';
import { GRADE_TABLE } from '../utils/constants';
import {
  calculateSubjectGWA,
  calculatePartialPercentage,
  predictToPass,
  predictForTarget,
  calculateWhatIfGWA,
  isDeansListEligible,
  getGradeProgress
} from '../utils/gradingCalculations';

interface CalculatorTabProps {
  darkMode: boolean;
  singleSubject: Subject;
  targetGrade: number;
  showSettings: boolean;
  showGradeTable: boolean;
  canPredict: boolean;
  onUpdateSingleSubject: (field: keyof Subject, value: string) => void;
  onSetTargetGrade: (grade: number) => void;
  onToggleSettings: () => void;
  onToggleGradeTable: () => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  darkMode,
  singleSubject,
  targetGrade,
  showSettings,
  showGradeTable,
  onUpdateSingleSubject,
  onSetTargetGrade,
  onToggleSettings,
  onToggleGradeTable
}) => {
  const [simulatedFinals, setSimulatedFinals] = useState<number>(75);

  const singleResult = useMemo(() => calculateSubjectGWA(singleSubject), [singleSubject]);
  const partialPercentage = useMemo(() => calculatePartialPercentage(singleSubject), [singleSubject]);
  const toPass = useMemo(() => predictToPass(singleSubject), [singleSubject]);
  const toTarget = useMemo(() => predictForTarget(singleSubject, targetGrade), [singleSubject, targetGrade]);
  const whatIfResult = useMemo(() => calculateWhatIfGWA(singleSubject, simulatedFinals), [singleSubject, simulatedFinals]);
  const progress = useMemo(() => getGradeProgress(singleSubject), [singleSubject]);

  const hasAllGrades = progress.filled === 4;
  const canPredict = progress.filled >= 1 && progress.filled < 4;

  const gradeInputs = [
    { field: 'prelim', label: 'Prelim', weight: '20%' },
    { field: 'midterm', label: 'Midterm', weight: '20%' },
    { field: 'preFinal', label: 'Pre-Final', weight: '20%' },
    { field: 'finals', label: 'Finals', weight: '40%' }
  ];

  const displayPercentage = singleResult 
    ? singleResult.percentage.toFixed(2)
    : partialPercentage 
      ? partialPercentage.toFixed(2)
      : null;

  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-xs tracking-wider font-medium ${textMuted}`}>Enter Grades</span>
        <button 
          onClick={onToggleGradeTable}
          className={`text-xs font-medium ${textMuted} hover:${textColor} transition-colors flex items-center gap-1`}
        >
          Grading Table {showGradeTable ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Grade Table - Minimal */}
      {showGradeTable && (
        <div className={`${cardBg} rounded-xl border ${border} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${border} ${inputBg}`}>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Grade</th>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Range</th>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Remark</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'divide-y divide-[#1a1a1a]' : 'divide-y divide-gray-100'}>
              {GRADE_TABLE.map((g) => (
                <tr key={g.grade}>
                  <td className={`px-4 py-2 font-semibold ${textColor}`}>{g.grade.toFixed(2)}</td>
                  <td className={`px-4 py-2 ${textLight}`}>{g.min} - {g.max}</td>
                  <td className={`px-4 py-2 font-medium ${g.grade === 5.00 ? 'text-red-400' : g.grade <= 1.50 ? 'text-emerald-400' : textColor}`}>
                    {g.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grade Inputs - 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {gradeInputs.map(({ field, label, weight }) => (
          <div key={field} className={`${cardBg} rounded-xl p-4 border ${border}`}>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-xs font-medium ${textLight}`}>{label}</label>
              <span className={`text-xs ${textMuted}`}>{weight}</span>
            </div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={singleSubject[field as keyof Subject]}
              onChange={(e) => onUpdateSingleSubject(field as keyof Subject, e.target.value)}
              className={`w-full bg-transparent text-2xl font-bold outline-none placeholder-[#333] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${textColor}`}
              placeholder="--"
            />
          </div>
        ))}
      </div>

      {/* GWA Result */}
      <div className={`${cardBg} rounded-xl p-5 border ${border}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${textMuted}`}>Your GWA</span>
          {singleResult && isDeansListEligible(singleResult.grade) && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-medium">
              <Award className="w-3 h-3" />
              Dean's List
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className={`text-4xl font-bold tracking-tight ${textColor}`}>
            {displayPercentage ? `${displayPercentage}%` : 'N/A'}
          </div>
          {singleResult && (
            <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
              singleResult.status === 'passed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
            }`}>
              {singleResult.description}
            </span>
          )}
          {!singleResult && partialPercentage && (
            <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400">
              In Progress
            </span>
          )}
        </div>
        
        {(singleResult || partialPercentage) && (
          <div className="mt-4">
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`}>
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  singleResult ? (singleResult.status === 'passed' ? 'bg-emerald-500' : 'bg-red-500') : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(displayPercentage ? parseFloat(displayPercentage) : 0, 100)}%` }}
              />
            </div>
          </div>
        )}
        
        <div className={`text-sm mt-3 ${textMuted}`}>
          {singleResult 
            ? `Grade: ${singleResult.grade.toFixed(2)} - ${singleResult.status === 'passed' ? 'Passed' : 'Failed'}`
            : progress.filled > 0
              ? `${progress.filled}/4 grades entered - ${progress.remaining.join(', ')} remaining`
              : 'Enter grades to start'
          }
        </div>
      </div>

      {/* What-If Simulator - Show when 3 grades filled */}
      {progress.filled === 3 && !hasAllGrades && (
        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-3`}>What-If Simulator</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${textLight}`}>If {progress.remaining[0]}:</span>
              <span className={`text-lg font-bold ${textColor}`}>{simulatedFinals}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatedFinals}
              onChange={(e) => setSimulatedFinals(Number(e.target.value))}
              className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: darkMode 
                  ? `linear-gradient(to right, #10b981 0%, #10b981 ${simulatedFinals}%, #1a1a1a ${simulatedFinals}%, #1a1a1a 100%)`
                  : `linear-gradient(to right, #10b981 0%, #10b981 ${simulatedFinals}%, #e5e7eb ${simulatedFinals}%, #e5e7eb 100%)`
              }}
            />
            {whatIfResult && (
              <div className={`flex items-center justify-between pt-3 border-t ${border}`}>
                <span className={`text-sm ${textMuted}`}>Result:</span>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${textColor}`}>{whatIfResult.percentage.toFixed(2)}%</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    whatIfResult.status === 'passed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                  }`}>
                    {whatIfResult.grade.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Predictions - Works with any grades */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-2`}>Need for Target</div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-2xl font-bold ${canPredict && toTarget !== null && toTarget > 100 ? 'text-red-400' : textColor}`}>
              {hasAllGrades ? 'Complete' : canPredict && toTarget !== null 
                ? toTarget <= 100 ? `${toTarget.toFixed(1)}%` : 'Impossible' : 'N/A'}
            </span>
            {hasAllGrades ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Done</span>
            ) : canPredict && toTarget !== null && toTarget <= 100 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Achievable</span>
            ) : canPredict && toTarget !== null && toTarget > 100 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-medium">Can't Reach</span>
            ) : null}
          </div>
          <div className={`text-xs ${textMuted}`}>
            {hasAllGrades ? 'All grades entered' 
              : canPredict && toTarget !== null && toTarget > 100 ? `Would need ${toTarget.toFixed(1)}% avg`
              : canPredict ? `Avg in ${progress.remaining.join(', ')}` 
              : 'Enter grades first'}
          </div>
        </div>

        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className={`text-xs font-medium ${textMuted} mb-2`}>Need to Pass</div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-2xl font-bold ${canPredict && toPass !== null && toPass > 100 ? 'text-red-400' : textColor}`}>
              {hasAllGrades ? 'Complete' : canPredict && toPass !== null 
                ? toPass <= 100 ? `${toPass.toFixed(1)}%` : 'Impossible' : 'N/A'}
            </span>
            {hasAllGrades ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Done</span>
            ) : canPredict && toPass !== null && toPass <= 100 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Achievable</span>
            ) : canPredict && toPass !== null && toPass > 100 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-medium">Can't Pass</span>
            ) : null}
          </div>
          <div className={`text-xs ${textMuted}`}>
            {hasAllGrades ? 'All grades entered' 
              : canPredict && toPass !== null && toPass > 100 ? `Would need ${toPass.toFixed(1)}% avg`
              : canPredict ? 'Avg for 59.5%' 
              : 'Enter grades first'}
          </div>
        </div>
      </div>

      {/* Settings */}
      <button onClick={onToggleSettings} className={`w-full ${cardBg} rounded-xl p-4 border ${border} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Settings className={`w-4 h-4 ${textMuted}`} />
          <span className={`text-sm font-medium ${textColor}`}>Settings</span>
        </div>
        <ChevronDown className={`w-4 h-4 ${textMuted} transition-transform ${showSettings ? 'rotate-180' : ''}`} />
      </button>

      {showSettings && (
        <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium ${textMuted} mb-2`}>Target GWA</label>
              <select
                value={targetGrade}
                onChange={(e) => onSetTargetGrade(Number(e.target.value))}
                className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2.5 text-sm font-medium outline-none ${textColor}`}
              >
                {GRADE_TABLE.filter(g => g.grade < 5.00).map(g => (
                  <option key={g.grade} value={g.grade}>{g.grade.toFixed(2)} - {g.description}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium ${textMuted} mb-2`}>Passing</label>
              <div className={`w-full ${inputBg} border ${border} rounded-lg px-3 py-2.5 text-sm font-medium ${textColor}`}>59.5% (3.00)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
