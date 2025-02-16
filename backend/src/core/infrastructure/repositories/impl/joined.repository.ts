import { CreateJoinedDto, UpdateJoinedDto } from '@game/data/dto';
import { joinedToEntity } from '@game/data/mappers';
import { PrismaService } from '@game/database';
import { JoinedRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JoinedRepositoryImpl implements JoinedRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async getJoined(projectId: string, invitedId: string) {
    const joined = await this._prisma.joined.findFirst({
      where: {
        projectId,
        invitedId,
      },
      include: {
        User: true,
      },
    });

    if (!joined) {
      return null;
    }

    return joinedToEntity(joined);
  }

  public async getJoinedByProject(projectId: string) {
    const joined = await this._prisma.joined.findMany({
      where: {
        projectId,
      },
      include: {
        User: true,
      },
    });

    if (!joined) {
      return [];
    }

    return joined.map(joinedToEntity);
  }

  public async create(createDto: CreateJoinedDto) {
    const { inviterId, projectId, invitedId, role } = createDto;

    const joined = await this._prisma.joined.create({
      data: {
        invitedId,
        projectId,
        inviterId,
        role,
      },
      include: {
        User: true,
      },
    });

    if (!joined) {
      return null;
    }

    return joinedToEntity(joined);
  }

  public async update(invitedId: string, projectId: string, updateJoinedDto: UpdateJoinedDto) {
    const joined = await this._prisma.joined.update({
      where: {
        invitedId_projectId: {
          invitedId,
          projectId,
        },
      },
      data: {
        ...updateJoinedDto,
      },
      include: {
        User: true,
      },
    });

    if (!joined) {
      return null;
    }

    return joinedToEntity(joined);
  }
}
