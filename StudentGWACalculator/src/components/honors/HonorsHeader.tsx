import React from 'react';

interface HonorsHeaderProps {
  isBaccalaureate: boolean;
  onSetIsBaccalaureate: (value: boolean) => void;
  darkMode: boolean;
}

export const HonorsHeader: React.FC<HonorsHeaderProps> = ({
  isBaccalaureate,
  onSetIsBaccalaureate,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const border = darkMode ? 'border-[#222]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';

  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold ${textMuted} uppercase tracking-wider`}>
        Honors Check
      </span>
      <select
        value={isBaccalaureate ? 'bacc' : 'other'}
        onChange={(e) => onSetIsBaccalaureate(e.target.value === 'bacc')}
        className={`
          ${inputBg} border ${border} rounded-lg
          px-2.5 py-1.5 text-xs font-medium outline-none ${textColor}
          transition-colors cursor-pointer
        `}
        aria-label="Program type"
      >
        <option value="bacc">Baccalaureate</option>
        <option value="other">Non-Baccalaureate</option>
      </select>
    </div>
  );
};
