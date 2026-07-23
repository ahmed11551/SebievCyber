import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick
}) => {
  const baseStyles = 'rounded-xl transition-all duration-200';
  
  const variants = {
    default: 'bg-slate-900 border border-slate-800',
    glass: 'bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl',
    elevated: 'bg-slate-900 shadow-2xl shadow-slate-950/50',
    bordered: 'bg-transparent border-2 border-dashed border-slate-700'
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  };
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className} ${onClick ? 'cursor-pointer hover:border-cyan-500/50' : ''}`}
    >
      {children}
    </Component>
  );
};
