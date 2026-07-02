'use client';

import { Providers } from '@/providers/query-provider';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
