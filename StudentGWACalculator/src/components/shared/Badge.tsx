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
      bg: darkMode ? 'bg-emerald-500/15' : 'bg-emerald-100',
      text: darkMode ? 'text-emerald-400' : 'text-emerald-700',
      border: darkMode ? 'border-emerald-500/30' : 'border-emerald-300'
    },
    error: {
      bg: darkMode ? 'bg-red-500/15' : 'bg-red-100',
      text: darkMode ? 'text-red-400' : 'text-red-700',
      border: darkMode ? 'border-red-500/30' : 'border-red-300'
    },
    warning: {
      bg: darkMode ? 'bg-amber-500/15' : 'bg-amber-100',
      text: darkMode ? 'text-amber-400' : 'text-amber-700',
      border: darkMode ? 'border-amber-500/30' : 'border-amber-300'
    },
    info: {
      bg: darkMode ? 'bg-blue-500/15' : 'bg-blue-100',
      text: darkMode ? 'text-blue-400' : 'text-blue-700',
      border: darkMode ? 'border-blue-500/30' : 'border-blue-300'
    },
    neutral: {
      bg: darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200',
      text: darkMode ? 'text-[#888]' : 'text-gray-700',
      border: darkMode ? 'border-[#2a2a2a]' : 'border-gray-300'
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
  size = 'md', 
  darkMode = true 
}) => (
  <Badge 
    variant="warning" 
    size={size} 
    darkMode={darkMode}
    className="bg-yellow-500/15 text-yellow-400"
  >
    Dean's List
  </Badge>
);

export const StatusBadge: React.FC<{ 
  status: 'passed' | 'failed' | 'in-progress'; 
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}> = ({ status, size = 'md', label }) => {
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
    <Badge variant={variants[status]} size={size}>
      {labels[status]}
    </Badge>
  );
};

export const AchievableBadge: React.FC<{ 
  achievable: boolean; 
  size?: 'sm' | 'md' | 'lg';
}> = ({ achievable, size = 'sm' }) => (
  <Badge variant={achievable ? 'success' : 'error'} size={size}>
    {achievable ? 'Achievable' : "Can't Reach"}
  </Badge>
);
