import React from 'react';
import { Percent } from 'lucide-react';
import { Card } from '../shared';

interface TuitionDiscountCardProps {
  discount: number;
  darkMode: boolean;
}

export const TuitionDiscountCard: React.FC<TuitionDiscountCardProps> = ({
  discount,
  darkMode
}) => {
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const discountColor = darkMode ? 'text-emerald-400' : 'text-emerald-600';

  if (discount === 0) return null;

  return (
    <Card darkMode={darkMode} padding="md">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Percent className={`w-3.5 h-3.5 ${textLight}`} />
          <span className={`text-xs font-semibold ${textLight} uppercase tracking-wide`}>
            Tuition Discount
          </span>
        </div>
        <div className={`text-2xl font-bold ${discountColor} tabular-nums`}>
          {discount}%
        </div>
        <p className={`text-xs ${textLight} mt-1`}>next term</p>
      </div>
    </Card>
  );
};
