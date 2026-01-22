'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Subject, SemesterRecord, QuickEntrySubject } from '../types';

interface AppContextType {
    // Dark mode
    darkMode: boolean;
    toggleDarkMode: () => void;

    // Single subject (calculator tab)
    singleSubject: Subject;
    updateSingleSubject: (field: keyof Subject, value: string) => void;

    // Multiple subjects (cumulative tab)
    subjects: Subject[];
    addSubject: () => void;
    removeSubject: (id: string) => void;
    updateSubject: (id: string, field: keyof Subject, value: string) => void;
    clearAllSubjects: () => void;
    restoreSubjects: (subjects: Subject[]) => void;

    // Grade history
    gradeHistory: SemesterRecord[];
    addToHistory: (
        name: string,
        gwa: number,
        subjectCount: number,
        subjectsData?: Subject[],
        finalGradesData?: QuickEntrySubject[],
        mode?: 'detailed' | 'final'
    ) => void;
    removeFromHistory: (id: string) => void;

    // Selected history GWA
    selectedHistoryGWA: number | null;
    setSelectedHistoryGWA: (gwa: number | null) => void;

    // Settings
    showSettings: boolean;
    setShowSettings: (show: boolean) => void;
    showGradeTable: boolean;
    setShowGradeTable: (show: boolean) => void;
    targetGrade: number;
    setTargetGrade: (grade: number) => void;
    isBaccalaureate: boolean;
    setIsBaccalaureate: (value: boolean) => void;

    // Update modal
    showUpdateModal: boolean;
    setShowUpdateModal: (show: boolean) => void;
    markUpdateModalSeen: () => void;

    // Loading state
    isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const UPDATE_MODAL_SEEN_KEY = 'updateModalSeen_v2.0.0';

export function AppProvider({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme();
    const [showSettings, setShowSettings] = useState(false);
    const [showGradeTable, setShowGradeTable] = useState(false);
    const [targetGrade, setTargetGrade] = useState<number>(1.0);
    const [isBaccalaureate, setIsBaccalaureate] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [singleSubject, setSingleSubject] = useState<Subject>({
        id: '1',
        name: '',
        units: '',
        prelim: '',
        midterm: '',
        preFinal: '',
        finals: '',
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [gradeHistory, setGradeHistory] = useState<SemesterRecord[]>([]);
    const [selectedHistoryGWA, setSelectedHistoryGWA] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load gradeHistory from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('gradeHistory');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setGradeHistory(parsed);
                }
            }
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

    // Derive darkMode from next-themes
    const darkMode = theme === 'dark';

    const toggleDarkMode = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const updateSingleSubject = (field: keyof Subject, value: string) => {
        const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
        setSingleSubject((prev) => ({ ...prev, [field]: numValue }));
    };

    const addSubject = () => {
        setSubjects((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                name: '',
                units: '',
                prelim: '',
                midterm: '',
                preFinal: '',
                finals: '',
            },
        ]);
    };

    const removeSubject = (id: string) => {
        setSubjects((prev) => prev.filter((s) => s.id !== id));
    };

    const clearAllSubjects = () => {
        setSubjects([]);
    };

    const restoreSubjects = (restoredSubjects: Subject[]) => {
        setSubjects(
            restoredSubjects.map((s) => ({
                ...s,
                id: Date.now().toString() + Math.random(),
            }))
        );
    };

    const updateSubject = (id: string, field: keyof Subject, value: string) => {
        if (field === 'name') {
            setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
        } else {
            const numValue = value === '' ? '' : Math.min(100, Math.max(0, Number(value)));
            setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: numValue } : s)));
        }
    };

    const addToHistory = (
        name: string,
        gwa: number,
        subjectCount: number,
        subjectsData?: Subject[],
        finalGradesData?: QuickEntrySubject[],
        mode?: 'detailed' | 'final'
    ) => {
        const record: SemesterRecord = {
            id: Date.now().toString(),
            name,
            gwa,
            subjects: subjectCount,
            date: new Date().toLocaleDateString(),
            subjectsData,
            finalGradesData,
            mode,
        };
        setGradeHistory((prev) => [...prev, record]);
    };

    const removeFromHistory = (id: string) => {
        const recordToRemove = gradeHistory.find((r) => r.id === id);
        if (recordToRemove && selectedHistoryGWA === recordToRemove.gwa) {
            setSelectedHistoryGWA(null);
        }
        setGradeHistory((prev) => prev.filter((r) => r.id !== id));
    };

    const markUpdateModalSeen = () => {
        localStorage.setItem(UPDATE_MODAL_SEEN_KEY, '1');
        setShowUpdateModal(false);
    };

    return (
        <AppContext.Provider
            value={{
                darkMode,
                toggleDarkMode,
                singleSubject,
                updateSingleSubject,
                subjects,
                addSubject,
                removeSubject,
                updateSubject,
                clearAllSubjects,
                restoreSubjects,
                gradeHistory,
                addToHistory,
                removeFromHistory,
                selectedHistoryGWA,
                setSelectedHistoryGWA,
                showSettings,
                setShowSettings,
                showGradeTable,
                setShowGradeTable,
                targetGrade,
                setTargetGrade,
                isBaccalaureate,
                setIsBaccalaureate,
                showUpdateModal,
                setShowUpdateModal,
                markUpdateModalSeen,
                isLoaded,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}