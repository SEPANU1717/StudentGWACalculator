import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CalculatorTab } from './components/CalculatorTab';
import { CumulativeTab } from './components/CumulativeTab';
import { PredictionsTab } from './components/PredictionsTab';
import { HonorsTab } from './components/HonorsTab';
import { Subject, SemesterRecord } from './types';

type Tab = 'calculator' | 'predictions' | 'cumulative' | 'honors';

export default function STIGradeCalculator() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showGradeTable, setShowGradeTable] = useState(false);
  const [targetGrade, setTargetGrade] = useState<number>(1.00);
  const [isBaccalaureate, setIsBaccalaureate] = useState(true);
  
  const [singleSubject, setSingleSubject] = useState<Subject>({
    id: '1', name: '', prelim: '', midterm: '', preFinal: '', finals: ''
  });
  
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', prelim: '', midterm: '', preFinal: '', finals: '' }
  ]);

  const [gradeHistory, setGradeHistory] = useState<SemesterRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gradeHistory');
    if (saved) setGradeHistory(JSON.parse(saved));
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
    const savedLanding = localStorage.getItem('hasVisited');
    if (savedLanding) setShowLanding(false);
  }, []);

  useEffect(() => { localStorage.setItem('gradeHistory', JSON.stringify(gradeHistory)); }, [gradeHistory]);
  useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(darkMode)); }, [darkMode]);

  const handleGetStarted = () => {
    setShowLanding(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const canPredict = singleSubject.prelim !== '' && singleSubject.midterm !== '' && 
                     singleSubject.preFinal !== '' && singleSubject.finals === '';

  const updateSingleSubject = (field: keyof Subject, value: string) => {
    const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
    setSingleSubject(prev => ({ ...prev, [field]: numValue }));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, { id: Date.now().toString(), name: '', prelim: '', midterm: '', preFinal: '', finals: '' }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const clearAllSubjects = () => {
    setSubjects([{ id: Date.now().toString(), name: '', prelim: '', midterm: '', preFinal: '', finals: '' }]);
  };

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    if (field === 'name') {
      setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    } else {
      const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
      setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: numValue } : s));
    }
  };

  const addToHistory = (name: string, gwa: number, subjectCount: number) => {
    const record: SemesterRecord = { id: Date.now().toString(), name, gwa, subjects: subjectCount, date: new Date().toLocaleDateString() };
    setGradeHistory(prev => [...prev, record]);
  };

  const removeFromHistory = (id: string) => setGradeHistory(prev => prev.filter(r => r.id !== id));
  const clearHistory = () => setGradeHistory([]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'cumulative', label: 'Cumulative' },
    { id: 'honors', label: 'Honors' }
  ];

  const bgColor = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  if (showLanding) {
    return <LandingPage darkMode={darkMode} onGetStarted={handleGetStarted} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onShowLanding={() => setShowLanding(true)} />
      
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className={`text-xl font-bold tracking-tight ${textColor}`}>STI Grade Calculator</h1>
          <p className={`text-xs mt-1 ${darkMode ? 'text-[#555]' : 'text-gray-500'}`}>Calculate GWA and check honors</p>
        </div>

        {/* Tabs */}
        <nav className="mb-6">
          <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-[#0a0a0a] border-[#1a1a1a]' : 'bg-white border-gray-200'} border`}>
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === id
                    ? darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-gray-900 text-white'
                    : darkMode ? 'text-[#555] hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {activeTab === 'calculator' && (
          <CalculatorTab
            darkMode={darkMode}
            singleSubject={singleSubject}
            targetGrade={targetGrade}
            showSettings={showSettings}
            showGradeTable={showGradeTable}
            canPredict={canPredict}
            onUpdateSingleSubject={updateSingleSubject}
            onSetTargetGrade={setTargetGrade}
            onToggleSettings={() => setShowSettings(!showSettings)}
            onToggleGradeTable={() => setShowGradeTable(!showGradeTable)}
          />
        )}

        {activeTab === 'predictions' && (
          <PredictionsTab
            darkMode={darkMode}
            singleSubject={singleSubject}
            targetGrade={targetGrade}
            canPredict={canPredict}
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
            onClearHistory={clearHistory}
          />
        )}

        {activeTab === 'honors' && (
          <HonorsTab
            darkMode={darkMode}
            subjects={subjects}
            gradeHistory={gradeHistory}
            isBaccalaureate={isBaccalaureate}
            onSetIsBaccalaureate={setIsBaccalaureate}
          />
        )}
      </main>
    </div>
  );
}
