import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '../shared';

interface EmptyStateProps {
  darkMode: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ darkMode }) => {
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <Card darkMode={darkMode} padding="lg">
      <div className="text-center py-4">

        <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
          darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
        }`}>
          <TrendingUp className={`w-5 h-5 ${textLight}`} />
        </div>


        <h3 className={`text-sm font-semibold mb-1 ${textColor}`}>
          No Predictions Yet
        </h3>


        <p className={`text-xs ${textLight}`}>
          Enter grades in Calculator to see predictions
        </p>
      </div>
    </Card>
  );
};
