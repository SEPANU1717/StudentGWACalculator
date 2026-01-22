'use client';

import { HonorsTab } from '../../../src/components/honors/HonorsTab';
import { useAppContext } from '../../../src/context/AppContext';

export default function HonorsPage() {
    const {
        darkMode,
        subjects,
        gradeHistory,
        isBaccalaureate,
        setIsBaccalaureate,
        selectedHistoryGWA,
    } = useAppContext();

    // Filter history to only include detailed mode records
    const detailedHistory = gradeHistory.filter(record => record.mode === 'detailed');

    return (
        <HonorsTab
            darkMode={darkMode}
            subjects={subjects}
            gradeHistory={detailedHistory}
            isBaccalaureate={isBaccalaureate}
            onSetIsBaccalaureate={setIsBaccalaureate}
            selectedHistoryGWA={selectedHistoryGWA}
        />
    );
}
