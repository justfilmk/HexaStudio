export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  category: Category;
  models: ProjectModel[];
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectModel {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  type: 'glb' | 'gltf' | 'usd';
  size: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  error?: string;
}
