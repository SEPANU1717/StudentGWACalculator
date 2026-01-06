import React from 'react';
import { ListChecks, Calculator } from 'lucide-react';

type CalculationMode = 'detailed' | 'final';

interface ModeSwitcherProps {
  mode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
  darkMode: boolean;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  mode,
  onModeChange,
  darkMode
}) => {
  const bgColor = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const activeBg = darkMode ? 'bg-[#1a1a1a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#666]' : 'text-gray-500';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const hoverText = darkMode ? 'hover:text-white' : 'hover:text-gray-900';

  return (
    <div className={`${bgColor} border ${border} rounded-xl p-1 flex gap-1 w-full sm:w-auto`}>
      <button
        onClick={() => onModeChange('detailed')}
        className={`
          flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 outline-none
          ${mode === 'detailed' 
            ? `${activeBg} ${textColor} shadow-sm` 
            : `${textMuted} ${hoverText}`
          }
        `}
      >
        <Calculator className="w-4 h-4" />
        <span>Detailed</span>
      </button>
      
      <button
        onClick={() => onModeChange('final')}
        className={`
          flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 outline-none
          ${mode === 'final' 
            ? `${activeBg} ${textColor} shadow-sm` 
            : `${textMuted} ${hoverText}`
          }
        `}
      >
        <ListChecks className="w-4 h-4" />
        <span>Final Grades</span>
      </button>
    </div>
  );
};
