'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../src/context/AppContext';
import { Header } from '../../src/components/Header';
import { TabNavigation } from '../../src/components/TabNavigation';
import { CalculatorTab } from '../../src/components/calculator/CalculatorTab';
import { CumulativeTab } from '../../src/components/cumulative/CumulativeTab';
import { HonorsTab } from '../../src/components/honors/HonorsTab';
import { PredictionsTab } from '../../src/components/predictions/PredictionsTab';
import { UpdateModal } from '../../src/components/UpdateModal';
import { PageTransition } from '../../src/components/shared/PageTransition';
import { SkeletonCard, Skeleton } from '../../src/components/shared/Skeleton';

type Tab = 'calculator' | 'cumulative' | 'honors' | 'predictions';

export default function AppPage() {
    const [activeTab, setActiveTab] = useState<Tab>('calculator');
    const [mounted, setMounted] = useState(false);
    const app = useAppContext();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleTabChange = (tab: Tab) => setActiveTab(tab);

    if (!mounted) {
        return (
            <div className="min-h-screen" suppressHydrationWarning>
                <Header darkMode={app.darkMode} toggleDarkMode={() => { }} />
                <main className="max-w-lg mx-auto px-4 py-6">
                    {/* Skeleton for TabNavigation */}
                    <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1a1a1a] mb-6 h-[62px]">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-full rounded-lg" />)}
                    </div>
                    <div>
                        <SkeletonCard hasTitle={true} lines={6} />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen" suppressHydrationWarning>
            <Header darkMode={app.darkMode} toggleDarkMode={app.toggleDarkMode} onShowLanding={() => router.push('/')} />

            <UpdateModal isOpen={app.showUpdateModal} onClose={app.markUpdateModalSeen} darkMode={app.darkMode} />

            <main className="max-w-lg mx-auto px-4 py-6">
                <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} darkMode={app.darkMode} />

                <AnimatePresence mode="wait">
                    <PageTransition key={activeTab} className="w-full">
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
                    </PageTransition>
                </AnimatePresence>
            </main>
        </div>
    );
}
