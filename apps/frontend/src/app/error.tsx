'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Uncaught error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-light text-neutral-900">Something went wrong.</h2>
      <p className="mb-8 text-sm text-neutral-500">
        The experience encountered an unexpected error. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-black px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white"
      >
        Try Again
      </button>
    </div>
  );
}
