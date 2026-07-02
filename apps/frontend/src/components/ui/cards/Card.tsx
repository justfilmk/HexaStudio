import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid';
}

export const Card = ({ children, className, variant = 'glass' }: CardProps) => {
  const variants = {
    glass: 'bg-[var(--glass-bg)] backdrop-blur-[12px] border border-[var(--glass-border)]',
    solid: 'bg-neutral-900 border border-neutral-800',
  };

  return (
    <div className={cn('p-6 transition-all duration-300', variants[variant], className)}>
      {children}
    </div>
  );
};
