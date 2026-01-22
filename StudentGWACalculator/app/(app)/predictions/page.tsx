'use client';

import { PredictionsTab } from '../../../src/components/predictions/PredictionsTab';
import { useAppContext } from '../../../src/context/AppContext';

export default function PredictionsPage() {
    const {
        darkMode,
        singleSubject,
        targetGrade,
    } = useAppContext();

    return (
        <PredictionsTab
            darkMode={darkMode}
            singleSubject={singleSubject}
            targetGrade={targetGrade}
            canPredict={false}
        />
    );
}
