import { createDynamicComponent } from '@/lib/dynamic-component';

export const LazySceneCanvas = createDynamicComponent(
  () => import('./components/SceneCanvas'),
  { ssr: false },
);

export type { SceneViewState } from '@/types';
