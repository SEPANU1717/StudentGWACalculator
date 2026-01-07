import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNavigation, Tab } from './components/TabNavigation';
import { LandingPage } from './components/landing/LandingPage';
import { UpdateModal } from './components/UpdateModal';
import { CalculatorTab } from './components/calculator/CalculatorTab';
import { CumulativeTab } from './components/cumulative/CumulativeTab';
import { PredictionsTab } from './components/predictions/PredictionsTab';
import { HonorsTab } from './components/honors/HonorsTab';
import { Subject, SemesterRecord, QuickEntrySubject } from './types';

export default function STIGradeCalculator() {
  const [showLanding, setShowLanding] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGradeTable, setShowGradeTable] = useState(false);
  const [targetGrade, setTargetGrade] = useState<number>(1.00);
  const [isBaccalaureate, setIsBaccalaureate] = useState(true);
  
  const [singleSubject, setSingleSubject] = useState<Subject>({
    id: '1', name: '', units: '', prelim: '', midterm: '', preFinal: '', finals: ''
  });
  
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', units: '', prelim: '', midterm: '', preFinal: '', finals: '' }
  ]);

  // Initialize state first, then load from localStorage
  const [gradeHistory, setGradeHistory] = useState<SemesterRecord[]>([]);
  const [selectedHistoryGWA, setSelectedHistoryGWA] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gradeHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setGradeHistory(parsed);
        }
      }
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
      // Always show the landing page on startup; do not auto-hide based on stored visits
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save gradeHistory to localStorage only after initial load
  useEffect(() => { 
    if (isLoaded) {
      localStorage.setItem('gradeHistory', JSON.stringify(gradeHistory)); 
    }
  }, [gradeHistory, isLoaded]);
  
  // Save darkMode preference to localStorage
  useEffect(() => { 
    if (isLoaded) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode)); 
    }
  }, [darkMode, isLoaded]);

  const handleGetStarted = () => {
    setShowLanding(false);
    localStorage.setItem('hasVisited', 'true');
    // Show update modal after 500ms
    setTimeout(() => setShowUpdateModal(true), 500);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const updateSingleSubject = (field: keyof Subject, value: string) => {
    const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
    setSingleSubject(prev => ({ ...prev, [field]: numValue }));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, { id: Date.now().toString(), name: '', units: '', prelim: '', midterm: '', preFinal: '', finals: '' }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const clearAllSubjects = () => {
    setSubjects([{ id: Date.now().toString(), name: '', units: '', prelim: '', midterm: '', preFinal: '', finals: '' }]);
  };

  const restoreSubjects = (restoredSubjects: Subject[]) => {
    setSubjects(restoredSubjects.map(s => ({ ...s, id: Date.now().toString() + Math.random() })));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    if (field === 'name') {
      setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    } else {
      const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
      setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: numValue } : s));
    }
  };

  const addToHistory = (name: string, gwa: number, subjectCount: number, subjectsData?: Subject[], finalGradesData?: QuickEntrySubject[], mode?: 'detailed' | 'final') => {
    const record: SemesterRecord = { 
      id: Date.now().toString(), 
      name, 
      gwa, 
      subjects: subjectCount, 
      date: new Date().toLocaleDateString(),
      subjectsData,
      finalGradesData,
      mode
    };
    setGradeHistory(prev => [...prev, record]);
  };

  const removeFromHistory = (id: string) => {
    const recordToRemove = gradeHistory.find(r => r.id === id);
    if (recordToRemove && selectedHistoryGWA === recordToRemove.gwa) {
      setSelectedHistoryGWA(null);
    }
    setGradeHistory(prev => prev.filter(r => r.id !== id));
  };

  const bgColor = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  if (showLanding) {
    return <LandingPage darkMode={darkMode} onGetStarted={handleGetStarted} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-150`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onShowLanding={() => setShowLanding(true)} />
      
      {/* Update Modal */}
      <UpdateModal 
        isOpen={showUpdateModal} 
        onClose={() => setShowUpdateModal(false)} 
        darkMode={darkMode} 
      />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          darkMode={darkMode} 
        />

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'calculator' && (
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
        )}

        {activeTab === 'predictions' && (
          <PredictionsTab
            darkMode={darkMode}
            singleSubject={singleSubject}
            targetGrade={targetGrade}
            canPredict={false}
          />
        )}

        {activeTab === 'cumulative' && (
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
        )}

        {activeTab === 'honors' && (
          <HonorsTab
            darkMode={darkMode}
            subjects={subjects}
            gradeHistory={gradeHistory.filter(record => record.mode === 'detailed')}
            isBaccalaureate={isBaccalaureate}
            onSetIsBaccalaureate={setIsBaccalaureate}
            selectedHistoryGWA={selectedHistoryGWA}
          />
        )}
        </div>
      </main>
    </div>
  );
}
