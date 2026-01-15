import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { GRADE_TABLE } from '../../utils/constants';
import { Card } from '../shared';

interface SettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  targetGrade: number;
  onSetTargetGrade: (grade: number) => void;
  darkMode: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onToggle,
  targetGrade,
  onSetTargetGrade,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';

  const gradeOptions = GRADE_TABLE.filter(g => g.grade < 5.00);

  return (
    <div className="space-y-3">
      {/* Toggle Button */}
      <Card
        darkMode={darkMode}
        padding="md"
        onClick={onToggle}
        className="cursor-pointer group"
      >
        <div className="flex items-center justify-between min-h-[32px]">
          <div className="flex items-center gap-2.5">
            <Settings className={`w-4 h-4 ${textMuted} group-hover:text-white transition-colors`} />
            <span className={`text-sm font-medium ${textColor}`}>Settings</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 ${textMuted} transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </Card>

      {/* Settings Content */}
      {isOpen && (
        <Card darkMode={darkMode} padding="md" className="animate-scale-in">
          <div className="space-y-4">
            {/* Target GWA */}
            <div>
              <label
                htmlFor="target-grade"
                className={`block text-[11px] font-semibold ${textMuted} uppercase tracking-wider mb-2`}
              >
                Target GWA
              </label>
              <select
                id="target-grade"
                value={targetGrade}
                onChange={(e) => onSetTargetGrade(Number(e.target.value))}
                className={`
                  w-full ${inputBg} border ${border} rounded-lg 
                  px-3 py-2.5 text-sm font-medium outline-none ${textColor}
                  transition-colors cursor-pointer
                  min-h-[44px]
                `}
              >
                {gradeOptions.map(g => (
                  <option key={g.grade} value={g.grade}>
                    {g.grade.toFixed(2)} — {g.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Info */}
            <div className={`text-xs ${textMuted} space-y-1`}>
              <p>Passing: 59.5% (3.00)</p>
              <p>Weights: Prelim 20% • Midterm 20% • Pre-Final 20% • Finals 40%</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
