import React from 'react';
import { GraduationCap } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t ${border} py-8`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
            }`}>
              <GraduationCap className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className={`font-semibold ${textColor}`}>STI GWA</div>
              <div className={`text-xs ${textMuted}`}>Student Grade Calculator</div>
            </div>
          </div>

          {/* Navigation Links (centered on larger screens, wrapped on small screens) */}
          <nav className="flex flex-wrap items-center gap-4 justify-center" aria-label="Footer navigation">
            <a 
              href="#features" 
              className={`text-sm hover:text-emerald-400 transition-colors ${textMuted}`}
            >
              Features
            </a>
            <a 
              href="#" 
              className={`text-sm hover:text-emerald-400 transition-colors ${textMuted}`}
            >
              Privacy
            </a>
            <a 
              href="#" 
              className={`text-sm hover:text-emerald-400 transition-colors ${textMuted}`}
            >
              Feedback
            </a>
          </nav>

          {/* Copyright / small note */}
          <div className="text-sm ${textMuted}">
            <span className={textMuted}>© {year} STI GWA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
