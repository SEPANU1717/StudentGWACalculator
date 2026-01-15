import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    bordered?: boolean;
    className?: string;
    darkMode?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'md',
    icon: Icon,
    bordered = false,
    className = '',
    darkMode = true
}) => {
    const sizeStyles = {
        sm: 'px-1.5 py-0.5 text-[10px] gap-1',
        md: 'px-2 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-sm gap-2'
    };

    const iconSizes = {
        sm: 'w-2.5 h-2.5',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    const variantStyles = {
        success: {
            bg: 'bg-emerald-500/15',
            text: 'text-emerald-500',
            border: 'border-emerald-500/30'
        },
        error: {
            bg: 'bg-red-500/15',
            text: 'text-red-500',
            border: 'border-red-500/30'
        },
        warning: {
            bg: 'bg-amber-500/15',
            text: 'text-amber-500',
            border: 'border-amber-500/30'
        },
        info: {
            bg: 'bg-blue-500/15',
            text: 'text-blue-500',
            border: 'border-blue-500/30'
        },
        neutral: {
            bg: darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100',
            text: darkMode ? 'text-gray-400' : 'text-gray-600',
            border: darkMode ? 'border-[#2a2a2a]' : 'border-gray-200'
        }
    };

    const styles = variantStyles[variant];
    const borderStyles = bordered ? `border ${styles.border}` : '';

    return (
        <span
            className={`
        inline-flex items-center font-medium rounded-full
        ${sizeStyles[size]}
        ${styles.bg}
        ${styles.text}
        ${borderStyles}
        ${className}
      `}
        >
            {Icon && <Icon className={iconSizes[size]} />}
            {children}
        </span>
    );
};

// Special badge variations
export const DeansListBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; darkMode?: boolean }> = ({
    size = 'md'
}) => (
    <Badge
        variant="warning"
        size={size}
        className="bg-yellow-500/15 text-yellow-500"
    >
        Dean's List
    </Badge>
);

export const StatusBadge: React.FC<{
    status: 'passed' | 'failed' | 'in-progress';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    darkMode?: boolean;
}> = ({ status, size = 'md', label, darkMode }) => {
    const variants = {
        'passed': 'success',
        'failed': 'error',
        'in-progress': 'warning'
    } as const;

    const labels = {
        'passed': label || 'Passed',
        'failed': label || 'Failed',
        'in-progress': label || 'In Progress'
    };

    return (
        <Badge variant={variants[status]} size={size} darkMode={darkMode}>
            {labels[status]}
        </Badge>
    );
};

export const AchievableBadge: React.FC<{
    achievable: boolean;
    size?: 'sm' | 'md' | 'lg';
    darkMode?: boolean;
}> = ({ achievable, size = 'sm', darkMode }) => (
    <Badge variant={achievable ? 'success' : 'error'} size={size} darkMode={darkMode}>
        {achievable ? 'Achievable' : "Can't Reach"}
    </Badge>
);
