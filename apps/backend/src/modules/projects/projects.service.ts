import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Project, ProjectResponse } from '@hexastudio/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllProjects(): Promise<ProjectResponse> {
    const cmsUrl = this.configService.get<string>('CMS_URL');
    // In a real scenario, this would call Strapi
    // For now, we return mock data that follows the Project type
    return {
      total: 1,
      projects: [
        {
          id: '1',
          title: 'The Obsidian Villa',
          slug: 'obsidian-villa',
          description: 'A study in darkness and light.',
          coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          category: { id: 'cat1', name: 'Residential', slug: 'residential' },
          modelUrl: '/assets/models/villa.glb',
          hotspots: [
            { id: 'h1', title: 'Living Room', description: 'Double height ceilings', position: [0, 2, 0], lookAt: [0, 2, 0] },
            { id: 'h2', title: 'Master Suite', description: 'Panoramic views', position: [5, 2, -2], lookAt: [0, 2, 0] },
          ],
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    const projects = await this.getAllProjects();
    const project = projects.projects.find(p => p.slug === slug);
    if (!project) throw new Error('Project not found');
    return project;
  }
}
