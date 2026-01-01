import React from 'react';
import { Award } from 'lucide-react';
import { Card } from '../shared';

interface EmptyStateProps {
  darkMode: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ darkMode }) => {
  const textLight = darkMode ? 'text-[#666]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <Card darkMode={darkMode} padding="lg">
      <div className="text-center py-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
          darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
        }`}>
          <Award className={`w-5 h-5 ${textLight}`} />
        </div>

        {/* Title */}
        <h3 className={`text-sm font-semibold mb-1 ${textColor}`}>
          No Honors Data
        </h3>

        {/* Description */}
        <p className={`text-xs ${textLight}`}>
          Enter grades to check eligibility
        </p>
      </div>
    </Card>
  );
};
