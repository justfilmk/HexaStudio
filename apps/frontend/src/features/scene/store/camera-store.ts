import { create } from 'zustand';

interface CameraState {
  currentTarget: string | null;
  isTransitioning: boolean;
  setTarget: (target: string | null) => void;
  setTransitioning: (status: boolean) => void;
}

/**
 * useCameraStore manages the state of the 3D camera.
 * It tracks the current point of interest and whether a transition is active.
 */
export const useCameraStore = create<CameraState>((set) => ({
  currentTarget: null,
  isTransitioning: false,
  setTarget: (target) => set({ currentTarget: target }),
  setTransitioning: (status) => set({ isTransitioning: status }),
}));
