import React from 'react';
import { Sliders } from 'lucide-react';
import { GradeResult } from '../../types';
import { Card, Badge } from '../shared';

interface WhatIfSimulatorProps {
    remainingGrade: string;
    simulatedValue: number;
    onSimulatedValueChange: (value: number) => void;
    whatIfResult: GradeResult | null;
    darkMode: boolean;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
    remainingGrade,
    simulatedValue,
    onSimulatedValueChange,
    whatIfResult,
    darkMode
}) => {
    const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
    const textLight = darkMode ? 'text-[#777]' : 'text-gray-500';
    const textColor = darkMode ? 'text-white' : 'text-gray-900';
    const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
    const trackBg = darkMode ? '#1a1a1a' : '#e5e7eb';

    const sliderBackground = `linear-gradient(to right, #10b981 0%, #10b981 ${simulatedValue}%, ${trackBg} ${simulatedValue}%, ${trackBg} 100%)`;

    return (
        <section>
            <p className={`text-[11px] font-semibold ${darkMode ? 'text-[#444]' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
                What-If
            </p>

            <Card darkMode={darkMode} padding="md">
                <div className="space-y-4">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sliders className={`w-4 h-4 ${textMuted}`} />
                            <span className={`text-sm ${textLight}`}>
                                <span className="font-semibold text-emerald-400">{remainingGrade}</span> grade
                            </span>
                        </div>
                        <span className={`text-xl font-bold ${textColor} tabular-nums`}>
                            {simulatedValue}%
                        </span>
                    </div>


                    <div className="relative py-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={simulatedValue}
                            onChange={(e) => onSimulatedValueChange(Number(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                            style={{ background: sliderBackground }}
                            aria-label={`Simulate ${remainingGrade} grade`}
                        />
                    </div>


                    {whatIfResult && (
                        <div className={`flex items-center justify-between pt-3 border-t ${border}`}>
                            <span className={`text-xs ${textMuted}`}>Projected</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold ${textColor} tabular-nums`}>
                                    {whatIfResult.percentage.toFixed(2)}%
                                </span>
                                <Badge
                                    variant={whatIfResult.status === 'passed' ? 'success' : 'error'}
                                    size="sm"
                                    darkMode={darkMode}
                                >
                                    {whatIfResult.grade.toFixed(2)}
                                </Badge>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </section>
    );
};
