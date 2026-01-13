import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card } from '../shared';

interface EligibilityRequirementsProps {
  isOpen: boolean;
  onToggle: () => void;
  darkMode: boolean;
}

const requirements = [
  'No grade lower than 2.00',
  '75%+ units from STI',
  'No major offense record',
  'Not OJT/Practicum/Thesis only',
  'No DRP in all loads',
  'No failing grade'
];

export const EligibilityRequirements: React.FC<EligibilityRequirementsProps> = ({
  isOpen,
  onToggle,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-500';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';

  return (
    <section>
      <p className={`text-xs font-semibold ${textMuted} uppercase tracking-wider mb-3`}>
        Requirements
      </p>
      
      {/* Toggle Button */}
      <Card
        darkMode={darkMode}
        padding="md"
        onClick={onToggle}
        className="cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className={`w-4 h-4 ${textLight}`} />
            <span className={`text-sm font-medium ${textColor}`}>Eligibility Criteria</span>
          </div>
          {isOpen ? (
            <ChevronUp className={`w-4 h-4 ${textLight}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${textLight}`} />
          )}
        </div>
      </Card>

      {/* Content */}
      {isOpen && (
        <Card darkMode={darkMode} padding="md" className="mt-2 animate-scale-in">
          <div className="grid grid-cols-2 gap-2">
            {requirements.map((req, i) => (
              <div key={i} className={`flex items-center gap-2 text-xs ${textLight}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200'
                } ${textColor}`}>
                  {i + 1}
                </span>
                <span className="flex-1">{req}</span>
              </div>
            ))}
          </div>
          
          <div className={`mt-3 pt-3 border-t ${border} text-xs ${textLight}`}>
            <strong className={textColor}>Note:</strong> From SY 2025-2026
          </div>
        </Card>
      )}
    </section>
  );
};
