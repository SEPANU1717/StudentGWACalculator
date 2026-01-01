import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  darkMode?: boolean;
  variant?: 'default' | 'bordered' | 'highlighted' | 'dashed';
  highlightColor?: 'emerald' | 'yellow' | 'red' | 'amber';
  onClick?: () => void;
  hoverable?: boolean;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  className = '',
  darkMode = true,
  variant = 'default',
  highlightColor,
  onClick,
  hoverable = false,
  id
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5'
  };

  const baseStyles = 'rounded-xl transition-all duration-200';
  
  const bgColor = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const borderColor = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  
  const variantStyles = {
    default: `${bgColor} border ${borderColor}`,
    bordered: `${bgColor} border-2 ${borderColor}`,
    highlighted: highlightColor 
      ? `${bgColor} border border-${highlightColor}-500/30`
      : `${bgColor} border ${borderColor}`,
    dashed: `${bgColor} border border-dashed ${borderColor}`
  };

  const highlightBorderStyles = {
    emerald: 'border-emerald-500/30',
    yellow: 'border-yellow-500/30',
    red: 'border-red-500/30',
    amber: 'border-amber-500/30'
  };

  const hoverStyles = hoverable
    ? darkMode 
      ? 'hover:border-[#2a2a2a] hover:bg-[#0f0f0f] cursor-pointer' 
      : 'hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
    : '';

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  const getBorderClass = () => {
    if (variant === 'highlighted' && highlightColor) {
      return `${bgColor} border ${highlightBorderStyles[highlightColor]}`;
    }
    return variantStyles[variant];
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${paddingStyles[padding]}
        ${getBorderClass()}
        ${hoverStyles}
        ${clickableStyles}
        ${className}
      `}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
