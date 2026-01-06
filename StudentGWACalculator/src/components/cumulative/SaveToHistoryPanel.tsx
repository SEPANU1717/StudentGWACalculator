import React from 'react';
import { Save } from 'lucide-react';
import { Card, Button } from '../shared';

interface SaveToHistoryPanelProps {
  semesterName: string;
  onSemesterNameChange: (name: string) => void;
  onSave: () => void;
  canSave: boolean;
  darkMode: boolean;
  isEditing?: boolean;
}

export const SaveToHistoryPanel: React.FC<SaveToHistoryPanelProps> = ({
  semesterName,
  onSemesterNameChange,
  onSave,
  canSave,
  darkMode,
  isEditing = false
}) => {
  const textMuted = darkMode ? 'text-[#444]' : 'text-gray-400';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  if (!canSave) return null;

  return (
    <Card darkMode={darkMode} padding="md">
      <div className="flex items-center justify-between mb-3">
        <p className={`text-[11px] font-semibold ${textMuted} uppercase tracking-wider`}>
          {isEditing ? 'Update History' : 'Save to History'}
        </p>
        {isEditing && (
          <span className={`text-[9px] px-2 py-0.5 rounded ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            Editing
          </span>
        )}
      </div>
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
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </div>
    </Card>
  );
};
