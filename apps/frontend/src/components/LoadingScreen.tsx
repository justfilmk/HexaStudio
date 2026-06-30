'use client';

import React from 'react';

interface LoadingScreenProps {
  children?: React.ReactNode;
}

/**
 * High-end loading screen with a minimalist aesthetic.
 * Used for initial app load and heavy asset transitions.
 */
export const LoadingScreen = ({ children }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Minimalist Loader */}
        <div className="h-12 w-12 overflow-hidden">
          <div className="h-full w-full animate-pulse bg-black" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
        <span className="mt-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
          Loading Experience
        </span>
      </div>
      {children}
    </div>
  );
};
