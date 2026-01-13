import React from 'react';
import { X, Sparkles, Calculator, History, TrendingUp, Split } from 'lucide-react';
import { Card } from './shared';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textMuted = darkMode ? 'text-[#666]' : 'text-gray-500';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const overlayBg = darkMode ? 'bg-black/80' : 'bg-gray-900/50';

  const updates = [
    {
      icon: Split,
      title: 'Dual Calculation Modes',
      description: 'Switch between Detailed (P/M/PF/F) and Final Grades modes for flexible calculations',
      color: darkMode ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Weighted GWA by Units',
      description: 'Accurate calculations using credit units for precise academic tracking',
      color: darkMode ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: History,
      title: 'Independent Histories',
      description: 'Separate history tracking for Detailed and Final modes with edit capabilities',
      color: darkMode ? 'text-purple-400 bg-purple-500/10' : 'text-purple-600 bg-purple-50'
    },
    {
      icon: Calculator,
      title: 'Smart Honors Sync',
      description: 'Only detailed mode syncs to Honors tab for accurate Latin honors eligibility',
      color: darkMode ? 'text-amber-400 bg-amber-500/10' : 'text-amber-600 bg-amber-50'
    }
  ];

  return (
    <div 
      className={`fixed inset-0 ${overlayBg} backdrop-blur-sm z-50 flex items-center justify-center p-4`}
      onClick={onClose}
    >
      <div 
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card darkMode={darkMode} padding="lg">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h2 className={`text-xl font-black ${textColor}`}>What's New</h2>
                <p className={`text-sm ${textMuted} mt-0.5`}>Latest improvements & features</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`${textMuted} hover:${textColor} transition-colors p-2 rounded-lg hover:${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Updates Grid */}
          <div className="space-y-4 mb-6">
            {updates.map((update, index) => {
              const Icon = update.icon;
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border ${border} ${darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'} transition-all hover:${darkMode ? 'bg-[#111]' : 'bg-gray-100'}`}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${update.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold ${textColor} mb-1`}>{update.title}</h3>
                      <p className={`text-sm ${textMuted} leading-relaxed`}>{update.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Version Info */}
          <div className={`text-center pt-4 border-t ${border}`}>
            <p className={`text-xs ${textMuted}`}>
              Version 2.0.0 • January 2026
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onClose}
            className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all ${
              darkMode 
                ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30' 
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 border border-emerald-300'
            }`}
          >
            Got it, thanks!
          </button>
        </Card>
      </div>
    </div>
  );
};
