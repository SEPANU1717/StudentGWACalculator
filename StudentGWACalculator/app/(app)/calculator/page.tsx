'use client';

import { CalculatorTab } from '../../../src/components/calculator/CalculatorTab';
import { useAppContext } from '../../../src/context/AppContext';

export default function CalculatorPage() {
    const {
        darkMode,
        singleSubject,
        targetGrade,
        showSettings,
        setShowSettings,
        showGradeTable,
        setShowGradeTable,
        selectedHistoryGWA,
        setSelectedHistoryGWA,
        updateSingleSubject,
        setTargetGrade,
    } = useAppContext();

    return (
        <CalculatorTab
            darkMode={darkMode}
            singleSubject={singleSubject}
            targetGrade={targetGrade}
            showSettings={showSettings}
            showGradeTable={showGradeTable}
            selectedHistoryGWA={selectedHistoryGWA}
            onUpdateSingleSubject={updateSingleSubject}
            onSetTargetGrade={setTargetGrade}
            onToggleSettings={() => setShowSettings(!showSettings)}
            onToggleGradeTable={() => setShowGradeTable(!showGradeTable)}
            onClearSelectedHistory={() => setSelectedHistoryGWA(null)}
        />
    );
}
