import React from 'react';
import { Plus } from 'lucide-react';
import { Subject, GradeResult } from '../../types';
import { SubjectCard } from './SubjectCard';

interface SubjectListProps {
  subjects: Subject[];
  subjectResults: Map<string, GradeResult | null>;
  onUpdateSubject: (id: string, field: keyof Subject, value: string) => void;
  onRemoveSubject: (id: string) => void;
  onAddSubject: () => void;
  darkMode: boolean;
}

export const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  subjectResults,
  onUpdateSubject,
  onRemoveSubject,
  onAddSubject,
  darkMode
}) => {
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';

  return (
    <section>
      <p className={`text-[11px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
        Subjects
      </p>

      <div className="space-y-3">
        {/* Subject Cards */}
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            index={index}
            result={subjectResults.get(subject.id) || null}
            canRemove={true}
            onUpdate={(field, value) => onUpdateSubject(subject.id, field, value)}
            onRemove={() => onRemoveSubject(subject.id)}
            darkMode={darkMode}
          />
        ))}

        {/* Add Subject Button */}
        <button
          onClick={onAddSubject}
          className={`
            w-full py-3 rounded-xl border border-dashed 
            ${darkMode ? 'border-[#1a1a1a] hover:border-[#333] hover:bg-[#0a0a0a]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            ${textMuted} hover:text-white
            transition-colors flex items-center justify-center gap-2 min-h-[48px]
            outline-none
          `}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Subject</span>
        </button>
      </div>
    </section>
  );
};
