import React from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../shared';

interface HeaderSectionProps {
  showHistory: boolean;
  onToggleHistory: () => void;
  darkMode: boolean;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  showHistory,
  onToggleHistory,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <Card
      darkMode={darkMode}
      padding="md"
      onClick={onToggleHistory}
      className="cursor-pointer group"
    >
      <div className="flex items-center justify-between min-h-[32px]">
        <div className="flex items-center gap-2.5">
          <History className={`w-4 h-4 ${textMuted} group-hover:text-white transition-colors`} />
          <span className={`text-sm font-medium ${textColor}`}>History</span>
        </div>
        {showHistory ? (
          <ChevronUp className={`w-4 h-4 ${textMuted}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${textMuted}`} />
        )}
      </div>
    </Card>
  );
};
