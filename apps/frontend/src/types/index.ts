export type {
  ApiResponse,
  Category,
  Project,
  ProjectModel,
  User,
} from '@hexastudio/types';

/** Frontend-specific view state for 3D scenes. */
export interface SceneViewState {
  isReady: boolean;
  activeHotspotId: string | null;
}
