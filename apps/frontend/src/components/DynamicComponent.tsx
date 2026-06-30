import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

interface DynamicComponentProps<T extends ComponentType<any>> {
  component: T;
  loading?: React.ReactNode;
  ssr?: boolean;
}

/**
 * A wrapper for dynamically importing components with a loading state.
 * Specifically useful for heavy 3D components that should not block the main thread.
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  Component: T, 
  options: { loading?: React.ReactNode; ssr?: boolean } = {}
) {
  return dynamic(() => Promise.resolve(Component), {
    loading: options.loading || <div>Loading...</div>,
    ssr: options.ssr ?? false,
  });
}
