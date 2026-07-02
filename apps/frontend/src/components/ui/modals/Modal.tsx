import React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={cn(
        'relative w-full max-w-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-8 transition-all duration-300',
        className
      )}>
        {title && (
          <h2 className="mb-6 text-2xl font-light tracking-tight text-white">
            {title}
          </h2>
        )}
        <div className="relative z-10">
          {children}
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
