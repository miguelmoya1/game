import { CreateProjectDto } from '@game/data/dto';
import { projectToEntity } from '@game/data/mappers';
import { PrismaService } from '@game/database';
import { ProjectRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async findForUser(userId: string) {
    const projectsJoined = await this._prisma.joined.findMany({
      where: {
        invitedId: userId,
      },
      include: {
        Project: true,
      },
    });

    if (!projectsJoined) {
      return [];
    }

    return projectsJoined.map((pj) => projectToEntity(pj.Project));
  }

  public async findById(id: string) {
    const project = await this._prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return null;
    }

    return projectToEntity(project);
  }

  public async findByApiKey(key: string) {
    const apiKey = await this._prisma.apiKey.findFirst({
      where: {
        key,
      },
      include: {
        Project: true,
      },
    });

    if (!apiKey) {
      return null;
    }

    return projectToEntity(apiKey.Project);
  }

  public async create(createProjectDto: CreateProjectDto) {
    // TODO: Check if the name is unique for a project
    const project = await this._prisma.project.create({
      data: {
        ...createProjectDto,
      },
    });

    if (!project) {
      return null;
    }

    return projectToEntity(project);
  }

  public async update(projectId: string, updateDto: CreateProjectDto) {
    const updated = await this._prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...updateDto,
      },
    });

    return projectToEntity(updated);
  }
}
