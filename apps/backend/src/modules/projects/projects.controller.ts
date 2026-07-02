import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectResponse } from '@hexastudio/types';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(): Promise<ProjectResponse> {
    return this.projectsService.getAllProjects();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.getProjectBySlug(slug);
  }
}
