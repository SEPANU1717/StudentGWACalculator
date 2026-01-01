import React, { useMemo } from 'react';
import { TrendingUp, CheckCircle, Target } from 'lucide-react';
import { Subject } from '../types';
import {
  calculateSubjectGWA,
  calculatePartialPercentage,
  calculateWhatIfGWA,
  getGradeProgress,
  predictToPass,
  predictForTarget
} from '../utils/gradingCalculations';

interface PredictionsTabProps {
  darkMode: boolean;
  singleSubject: Subject;
  targetGrade: number;
  canPredict: boolean;
}

export const PredictionsTab: React.FC<PredictionsTabProps> = ({
  darkMode,
  singleSubject,
  targetGrade
}) => {
  const singleResult = useMemo(() => calculateSubjectGWA(singleSubject), [singleSubject]);
  const partialPercentage = useMemo(() => calculatePartialPercentage(singleSubject), [singleSubject]);
  const progress = useMemo(() => getGradeProgress(singleSubject), [singleSubject]);
  const toPass = useMemo(() => predictToPass(singleSubject), [singleSubject]);
  const toTarget = useMemo(() => predictForTarget(singleSubject, targetGrade), [singleSubject, targetGrade]);

  const hasAllGrades = progress.filled === 4;
  const canPredict = progress.filled >= 1 && progress.filled < 4;

  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const inputBg = darkMode ? 'bg-[#000]' : 'bg-gray-50';

  // Grade scenarios table - works with any number of remaining grades
  const scenarios = useMemo(() => {
    if (!canPredict) return [];
    const scores = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    return scores.map(score => {
      const result = calculateWhatIfGWA(singleSubject, score);
      return { score, result };
    }).filter(s => s.result !== null);
  }, [singleSubject, canPredict]);

  // Get current progress info
  const currentProgress = useMemo(() => {
    if (progress.filled === 0) return null;
    const usedWeight = (1 - progress.remainingWeight) * 100;
    return { 
      accumulated: progress.currentScore, 
      weight: usedWeight,
      remainingWeight: progress.remainingWeight * 100
    };
  }, [progress]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-xs tracking-wider font-medium ${textMuted}`}>Predictions</span>
        <span className={`text-xs ${textMuted}`}>
          {hasAllGrades ? 'Complete' : `${progress.filled}/4 grades`}
        </span>
      </div>

      {/* Current Status Card */}
      <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            singleResult ? 'bg-emerald-500/15' : canPredict ? 'bg-amber-500/15' : darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
          }`}>
            {singleResult ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : (
              <TrendingUp className={`w-5 h-5 ${canPredict ? 'text-amber-400' : textMuted}`} />
            )}
          </div>
          <div className="flex-1">
            <div className={`text-sm font-medium ${textColor}`}>
              {singleResult ? 'Complete' : canPredict ? 'In Progress' : 'Enter Grades'}
            </div>
            <div className={`text-xs ${textMuted}`}>
              {singleResult 
                ? `Final: ${singleResult.percentage.toFixed(2)}% (${singleResult.grade.toFixed(2)})`
                : canPredict 
                  ? `Current: ${partialPercentage?.toFixed(2)}% of ${currentProgress?.weight.toFixed(0)}%`
                  : 'No grades entered yet'}
            </div>
          </div>
          {currentProgress && !hasAllGrades && (
            <div className="text-right">
              <div className={`text-lg font-bold ${textColor}`}>{currentProgress.accumulated.toFixed(1)}%</div>
              <div className={`text-xs ${textMuted}`}>{currentProgress.remainingWeight.toFixed(0)}% left</div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Need to Pass & Target */}
      {canPredict && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className={`w-4 h-4 ${textMuted}`} />
              <span className={`text-xs font-medium ${textMuted}`}>To Pass (59.5%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${toPass !== null && toPass > 100 ? 'text-red-400' : textColor}`}>
                {toPass !== null ? (toPass <= 100 ? `${toPass.toFixed(1)}%` : 'Impossible') : 'N/A'}
              </span>
              {toPass !== null && toPass <= 100 ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Achievable</span>
              ) : toPass !== null ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-medium">Can't Pass</span>
              ) : null}
            </div>
            <div className={`text-xs ${textMuted} mt-1`}>
              {toPass !== null && toPass > 100 
                ? `Would need ${toPass.toFixed(1)}%` 
                : 'Avg in remaining'}
            </div>
          </div>

          <div className={`${cardBg} rounded-xl p-4 border ${border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className={`w-4 h-4 ${textMuted}`} />
              <span className={`text-xs font-medium ${textMuted}`}>Target ({targetGrade.toFixed(2)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${toTarget !== null && toTarget > 100 ? 'text-red-400' : textColor}`}>
                {toTarget !== null ? (toTarget <= 100 ? `${toTarget.toFixed(1)}%` : 'Impossible') : 'N/A'}
              </span>
              {toTarget !== null && toTarget <= 100 ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Achievable</span>
              ) : toTarget !== null ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-medium">Can't Reach</span>
              ) : null}
            </div>
            <div className={`text-xs ${textMuted} mt-1`}>
              {toTarget !== null && toTarget > 100 
                ? `Would need ${toTarget.toFixed(1)}%` 
                : 'Avg in remaining'}
            </div>
          </div>
        </div>
      )}

      {/* Scenarios Table */}
      {canPredict && scenarios.length > 0 && (
        <div className={`${cardBg} rounded-xl border ${border} overflow-hidden`}>
          <div className={`px-4 py-3 border-b ${border} ${inputBg}`}>
            <span className={`text-xs font-medium ${textMuted}`}>
              If you get this average in: {progress.remaining.join(', ')}
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${border}`}>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Avg Score</th>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Final GWA</th>
                <th className={`px-4 py-2.5 text-left text-xs font-medium ${textMuted}`}>Grade</th>
                <th className={`px-4 py-2.5 text-right text-xs font-medium ${textMuted}`}>Status</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'divide-y divide-[#1a1a1a]' : 'divide-y divide-gray-100'}>
              {scenarios.map((s) => (
                <tr key={s.score}>
                  <td className={`px-4 py-2.5 font-semibold ${textColor}`}>{s.score}%</td>
                  <td className={`px-4 py-2.5 ${textLight}`}>{s.result?.percentage.toFixed(2)}%</td>
                  <td className={`px-4 py-2.5 font-semibold ${
                    s.result?.grade && s.result.grade <= 1.50 ? 'text-emerald-400' :
                    s.result?.grade === 5.00 ? 'text-red-400' : textColor
                  }`}>
                    {s.result?.grade.toFixed(2)}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      s.result?.status === 'passed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                    }`}>
                      {s.result?.status === 'passed' ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* All Grades Complete */}
      {hasAllGrades && singleResult && (
        <div className={`${cardBg} rounded-xl p-6 border ${border} text-center`}>
          <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
            singleResult.status === 'passed' ? 'bg-emerald-500/15' : 'bg-red-500/15'
          }`}>
            <CheckCircle className={`w-6 h-6 ${singleResult.status === 'passed' ? 'text-emerald-400' : 'text-red-400'}`} />
          </div>
          <div className={`text-lg font-bold mb-1 ${textColor}`}>All Grades Complete</div>
          <div className={`text-sm ${textMuted} mb-4`}>
            Final GWA: {singleResult.percentage.toFixed(2)}% ({singleResult.grade.toFixed(2)})
          </div>
          <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
            singleResult.status === 'passed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
          }`}>
            {singleResult.description}
          </div>
        </div>
      )}

      {/* No Grades Yet */}
      {progress.filled === 0 && (
        <div className={`${cardBg} rounded-xl p-6 border ${border} text-center`}>
          <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
            <TrendingUp className={`w-6 h-6 ${textMuted}`} />
          </div>
          <div className={`text-sm font-medium mb-2 ${textColor}`}>No Grades Yet</div>
          <div className={`text-xs ${textMuted}`}>Enter at least one grade in Calculator tab to see predictions</div>
        </div>
      )}
    </div>
  );
};
