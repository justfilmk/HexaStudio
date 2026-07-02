'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global Error Boundary to prevent the entire app from crashing
 * when a component (especially the 3D scene) fails.
 */
export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-4 text-2xl font-light text-neutral-900">Something went wrong.</h2>
          <p className="mb-8 text-sm text-neutral-500">The experience encountered an unexpected error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-xs uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
