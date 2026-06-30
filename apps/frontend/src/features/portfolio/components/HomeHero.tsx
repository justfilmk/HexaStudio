'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

/**
 * HomeHero is a feature component that handles the landing page's hero section.
 * Extracted from page.tsx to follow feature-based architecture.
 */
export const HomeHero = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://api.localhost";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-light tracking-tighter text-black">
          HexaStudio
        </h1>
        <p className="mt-4 text-lg font-light text-neutral-500">
          3D creative studio platform
        </p>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="primary" 
          asChild
        >
          <Link href="/api/health">
            Health Check
          </Link>
        </Button>
      </div>

      <p className="text-[10px] uppercase tracking-widest text-neutral-400">
        API: {apiUrl}
      </p>
    </main>
  );
};

// Wrapper to allow asChild behavior for Button if it doesn't exist (simplified for now)
Button.asChild = true; 
