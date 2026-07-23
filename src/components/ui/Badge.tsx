import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'amber' | 'emerald' | 'red' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = ''
}) => {
  const variants = {
    cyan: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    red: 'bg-red-500/20 text-red-300 border border-red-500/30',
    slate: 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center border rounded-md font-mono uppercase tracking-wider ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
