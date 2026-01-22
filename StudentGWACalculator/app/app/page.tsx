'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { TabNavigation } from '../../src/components/TabNavigation';
import { CalculatorTab } from '../../src/components/calculator/CalculatorTab';
import { CumulativeTab } from '../../src/components/cumulative/CumulativeTab';
import { HonorsTab } from '../../src/components/honors/HonorsTab';
import { PredictionsTab } from '../../src/components/predictions/PredictionsTab';
import { UpdateModal } from '../../src/components/UpdateModal';

type Tab = 'calculator' | 'cumulative' | 'honors' | 'predictions';

export default function AppPage() {
    const [activeTab, setActiveTab] = useState<Tab>('calculator');
    const [mounted, setMounted] = useState(false);
    const app = useAppContext();

    useEffect(() => {
        setMounted(true);
    }, []);

    const router = useRouter();
    const handleTabChange = (tab: Tab) => setActiveTab(tab);

    if (!mounted) return <div className="min-h-screen" suppressHydrationWarning />;

    return (
        <div className="min-h-screen" suppressHydrationWarning>
                <Header darkMode={app.darkMode} toggleDarkMode={app.toggleDarkMode} onShowLanding={() => router.push('/')} />

            <UpdateModal isOpen={app.showUpdateModal} onClose={app.markUpdateModalSeen} darkMode={app.darkMode} />

            <main className="max-w-lg mx-auto px-4 py-6">
                <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} darkMode={app.darkMode} />

                <div>
                    {activeTab === 'calculator' && (
                        <CalculatorTab
                            darkMode={app.darkMode}
                            singleSubject={app.singleSubject}
                            targetGrade={app.targetGrade}
                            showSettings={app.showSettings}
                            showGradeTable={app.showGradeTable}
                            selectedHistoryGWA={app.selectedHistoryGWA}
                            onUpdateSingleSubject={app.updateSingleSubject}
                            onSetTargetGrade={app.setTargetGrade}
                            onToggleSettings={() => app.setShowSettings(!app.showSettings)}
                            onToggleGradeTable={() => app.setShowGradeTable(!app.showGradeTable)}
                            onClearSelectedHistory={() => app.setSelectedHistoryGWA(null)}
                        />
                    )}

                    {activeTab === 'cumulative' && (
                        <CumulativeTab
                            darkMode={app.darkMode}
                            subjects={app.subjects}
                            isBaccalaureate={app.isBaccalaureate}
                            gradeHistory={app.gradeHistory}
                            onAddSubject={app.addSubject}
                            onRemoveSubject={app.removeSubject}
                            onUpdateSubject={app.updateSubject}
                            onClearAllSubjects={app.clearAllSubjects}
                            onAddToHistory={app.addToHistory}
                            onRemoveFromHistory={app.removeFromHistory}
                            selectedHistoryGWA={app.selectedHistoryGWA}
                            onClearSelectedHistory={() => app.setSelectedHistoryGWA(null)}
                            onRestoreSubjects={app.restoreSubjects}
                        />
                    )}

                    {activeTab === 'honors' && (
                        <HonorsTab
                            darkMode={app.darkMode}
                            subjects={app.subjects}
                            gradeHistory={app.gradeHistory.filter(r => r.mode === 'detailed')}
                            isBaccalaureate={app.isBaccalaureate}
                            onSetIsBaccalaureate={app.setIsBaccalaureate}
                            selectedHistoryGWA={app.selectedHistoryGWA}
                        />
                    )}

                    {activeTab === 'predictions' && (
                        <PredictionsTab
                            darkMode={app.darkMode}
                            singleSubject={app.singleSubject}
                            targetGrade={app.targetGrade}
                            canPredict={false}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
