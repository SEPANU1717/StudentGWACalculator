'use client';

import { CumulativeTab } from '../../../src/components/cumulative/CumulativeTab';
import { useAppContext } from '../../../src/context/AppContext';

export default function CumulativePage() {
    const {
        darkMode,
        subjects,
        isBaccalaureate,
        gradeHistory,
        addSubject,
        removeSubject,
        updateSubject,
        clearAllSubjects,
        addToHistory,
        removeFromHistory,
        selectedHistoryGWA,
        setSelectedHistoryGWA,
        restoreSubjects,
    } = useAppContext();

    return (
        <CumulativeTab
            darkMode={darkMode}
            subjects={subjects}
            isBaccalaureate={isBaccalaureate}
            gradeHistory={gradeHistory}
            onAddSubject={addSubject}
            onRemoveSubject={removeSubject}
            onUpdateSubject={updateSubject}
            onClearAllSubjects={clearAllSubjects}
            onAddToHistory={addToHistory}
            onRemoveFromHistory={removeFromHistory}
            selectedHistoryGWA={selectedHistoryGWA}
            onClearSelectedHistory={() => setSelectedHistoryGWA(null)}
            onRestoreSubjects={restoreSubjects}
        />
    );
}
