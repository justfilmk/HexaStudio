import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-sm transition-all duration-300 outline-none focus:border-brand-accent',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[10px] text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
