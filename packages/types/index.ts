export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  category: Category;
  modelUrl: string;
  hotspots: ProjectHotspot[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectModel {
  url: string;
  format: 'glb' | 'gltf';
  version: string;
  compressed: boolean;
}

export interface ProjectHotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  lookAt: [number, number, number];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProjectResponse {
  projects: Project[];
  total: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'editor' | 'user';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  error?: {
    message: string;
    code: string;
  };
}
