import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { GradeResult } from '../../types';
import { Card, Badge } from '../shared';

interface CompletionCardProps {
  result: GradeResult;
  darkMode: boolean;
}

export const CompletionCard: React.FC<CompletionCardProps> = ({
  result,
  darkMode
}) => {
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';

  const isPassed = result.status === 'passed';
  const Icon = isPassed ? CheckCircle : XCircle;

  return (
    <Card darkMode={darkMode} padding="lg">
      <div className="text-center">

        <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
          isPassed ? 'bg-emerald-500/15' : 'bg-red-500/15'
        }`}>
          <Icon className={`w-6 h-6 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`} />
        </div>


        <div className={`text-2xl font-bold mb-1 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
          {result.grade.toFixed(2)}
        </div>
        <p className={`text-sm ${textLight} mb-3`}>
          {result.percentage.toFixed(2)}% final
        </p>


        <Badge
          variant={isPassed ? 'success' : 'error'}
          size="md"
        >
          {isPassed ? 'Passed' : 'Failed'} • All Grades In
        </Badge>
      </div>
    </Card>
  );
};
