import React from 'react';

interface InputProps {
    value: string | number;
    onChange: (value: string) => void;
    type?: 'text' | 'number';
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost' | 'filled';
    textAlign?: 'left' | 'center' | 'right';
    className?: string;
    darkMode?: boolean;
    label?: string;
    hint?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    type = 'text',
    placeholder = '',
    min,
    max,
    step,
    disabled = false,
    size = 'md',
    variant = 'default',
    textAlign = 'left',
    className = '',
    darkMode = true,
    label,
    hint,
    error,
    fullWidth = true
}) => {
    const sizeStyles = {
        sm: 'px-2.5 py-2 text-sm min-h-[36px]',
        md: 'px-3 py-2.5 text-sm min-h-[44px]',
        lg: 'px-4 py-3 text-base min-h-[52px]'
    };

    const labelSizes = {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm'
    };

    const textAlignStyles = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    const variantStyles = {
        default: darkMode
            ? 'bg-[#0a0a0a] border border-[#1a1a1a] focus:border-emerald-500 focus:bg-[#0f0f0f]'
            : 'bg-white border border-gray-200 focus:border-emerald-500 focus:bg-white',
        ghost: 'bg-transparent border-transparent',
        filled: darkMode
            ? 'bg-[#1a1a1a] border border-transparent focus:bg-[#222]'
            : 'bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200'
    };

    const baseStyles = `
    rounded-xl font-medium outline-none transition-all duration-200
    placeholder-gray-500
    ${darkMode ? 'text-white' : 'text-gray-900'}
    [appearance:textfield] 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none
  `;

    const widthStyles = fullWidth ? 'w-full' : '';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (type === 'number') {
            if (newValue === '') {
                onChange('');
                return;
            }

            const numValue = parseFloat(newValue);
            if (!isNaN(numValue)) {
                let clampedValue = numValue;
                if (min !== undefined) clampedValue = Math.max(min, clampedValue);
                if (max !== undefined) clampedValue = Math.min(max, clampedValue);
                onChange(String(clampedValue));
            }
        } else {
            onChange(newValue);
        }
    };

    return (
        <div className={`${widthStyles} ${className}`}>
            {label && (
                <label className={`block ${labelSizes[size]} font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1.5 uppercase tracking-wide`}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${textAlignStyles[textAlign]}
          ${widthStyles}
          ${disabledStyles}
        `}
            />
            {hint && !error && (
                <p className={`mt-1 ${labelSizes[size]} text-gray-500`}>{hint}</p>
            )}
            {error && (
                <p className={`mt-1 ${labelSizes[size]} text-red-500`}>{error}</p>
            )}
        </div>
    );
};
