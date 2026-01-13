import React from 'react';
import { GraduationCap } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-500';
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

            {/* GitHub link */}
            <a
              href="https://github.com/SEPANU1717"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors ${textMuted}`}
              aria-label="GitHub repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-.95-.01-1.87-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1.01 1.73 2.65 1.23 3.3.94.1-.73.39-1.23.71-1.52-2.48-.28-5.09-1.24-5.09-5.5 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 2.78-.37c.94.01 1.89.13 2.78.37 2.12-1.44 3.05-1.13 3.05-1.13.61 1.52.22 2.64.11 2.92.71.78 1.14 1.77 1.14 2.98 0 4.27-2.61 5.21-5.09 5.49.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .29.2.64.77.53C19.05 20.88 22.25 16.69 22.25 11.75 22.25 5.48 17.27.5 12 .5z" />
              </svg>
              <span className="hidden sm:inline">SEPANU1717</span>
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
