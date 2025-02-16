import { CreateRequestJoinDto, RejectRequestJoinDto } from '@game/data/dto';
import { requestJoinToEntity } from '@game/data/mappers';
import { PrismaService } from '@game/database';
import { RequestJoinRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestJoinRepositoryImpl implements RequestJoinRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async getInvited(projectId: string, invitedId: string) {
    const requestJoin = await this._prisma.requestJoin.findUnique({
      where: {
        invitedId_projectId: {
          invitedId,
          projectId,
        },
      },
      include: {
        UserInvited: true,
      },
    });

    if (!requestJoin) {
      return null;
    }

    const { UserInvited } = requestJoin;

    return requestJoinToEntity({ requestJoin, UserInvited });
  }

  public async getInProject(projectId: string) {
    const requestJoins = await this._prisma.requestJoin.findMany({
      where: {
        projectId,
      },
      include: {
        UserInvited: true,
      },
    });

    return requestJoins.map((requestJoin) => {
      const { UserInvited } = requestJoin;

      return requestJoinToEntity({ requestJoin, UserInvited });
    });
  }

  public async create(createRequestJoinDto: CreateRequestJoinDto) {
    const { invitedId, inviterId, projectId } = createRequestJoinDto;

    const requestJoin = await this._prisma.requestJoin.create({
      data: {
        invitedId,
        inviterId,
        projectId,
      },
      include: {
        UserInvited: true,
      },
    });

    if (!requestJoin) {
      return null;
    }

    const { UserInvited } = requestJoin;

    return requestJoinToEntity({ requestJoin, UserInvited });
  }

  public async delete(rejectDto: RejectRequestJoinDto) {
    const { invitedId, projectId } = rejectDto;

    const requestJoin = await this._prisma.requestJoin.findUnique({
      where: {
        invitedId_projectId: {
          invitedId,
          projectId,
        },
      },
    });

    if (!requestJoin) {
      return false;
    }

    await this._prisma.requestJoin.delete({
      where: {
        invitedId_projectId: {
          invitedId,
          projectId,
        },
      },
    });

    return true;
  }
}
