import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  darkMode?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  darkMode = true
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl outline-none';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[52px]'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const variantStyles = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white',
    secondary: darkMode 
      ? 'bg-[#1a1a1a] hover:bg-[#222] active:bg-[#2a2a2a] text-white border border-[#2a2a2a]'
      : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 border border-gray-200',
    danger: 'bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400',
    ghost: darkMode
      ? 'bg-transparent hover:bg-[#1a1a1a] active:bg-[#222] text-[#888] hover:text-white'
      : 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600 hover:text-gray-800'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled || loading ? disabledStyles : ''}
        ${widthStyles}
        ${className}
      `}
    >
      {loading ? (
        <svg className={`animate-spin ${iconSizes[size]}`} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
        </>
      )}
    </button>
  );
};
