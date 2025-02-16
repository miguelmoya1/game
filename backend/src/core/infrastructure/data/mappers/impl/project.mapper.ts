import { ProjectBuilder } from '@game/builder';
import { ProjectEntity } from '@game/entities';
import { Project } from '@prisma/client';

export const projectToEntity = (project: Project): ProjectEntity => {
  return new ProjectBuilder(project.id, project.createdAt, project.updatedAt, project.deletedAt)
    .withName(project.name)
    .withDescription(project.description)
    .withOwnerId(project.ownerId)

    .build();
};
