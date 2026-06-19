import { create } from "zustand";

interface AppState {
  isSceneReady: boolean;
  setSceneReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSceneReady: false,
  setSceneReady: (ready) => set({ isSceneReady: ready }),
}));
