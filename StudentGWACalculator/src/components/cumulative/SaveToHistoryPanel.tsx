import React from 'react';
import { Save } from 'lucide-react';
import { Card, Button } from '../shared';

interface SaveToHistoryPanelProps {
  semesterName: string;
  onSemesterNameChange: (name: string) => void;
  onSave: () => void;
  canSave: boolean;
  darkMode: boolean;
}

export const SaveToHistoryPanel: React.FC<SaveToHistoryPanelProps> = ({
  semesterName,
  onSemesterNameChange,
  onSave,
  canSave,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  if (!canSave) return null;

  return (
    <Card darkMode={darkMode} padding="md">
      <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider mb-3`}>
        Save to History
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={semesterName}
          onChange={(e) => onSemesterNameChange(e.target.value)}
          placeholder="e.g., 1st Sem 2025"
          className={`
            flex-1 ${inputBg} border ${border} rounded-lg 
            px-3 py-2.5 text-sm font-medium outline-none ${textColor}
            transition-colors min-h-[44px] placeholder-[#333]
          `}
          aria-label="Semester name"
        />
        <Button
          onClick={onSave}
          variant="primary"
          size="md"
          icon={Save}
          darkMode={darkMode}
        >
          Save
        </Button>
      </div>
    </Card>
  );
};
