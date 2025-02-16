import { CreateRouteDto } from '@game/data/dto';
import { routeToEntity } from '@game/data/mappers';
import { PrismaService } from '@game/database';
import { RouteEntity } from '@game/entities';
import { RouteRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';
import { HttpMethod } from '@prisma/client';

@Injectable()
export class RouteRepositoryImpl implements RouteRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async findInProjectByMethod(projectId: string, method: HttpMethod) {
    const routes = await this._prisma.route.findMany({
      where: {
        projectId,
        method,
      },
    });

    if (!routes) {
      return [];
    }

    return routes.map(routeToEntity);
  }

  public async findInProject(projectId: string) {
    const routes = await this._prisma.route.findMany({
      where: {
        projectId,
      },
    });

    if (!routes) {
      return [];
    }

    return routes.map(routeToEntity);
  }

  public async getById(routeId: string): Promise<RouteEntity | null> {
    const route = await this._prisma.route.findUnique({
      where: {
        id: routeId,
      },
    });

    if (!route) {
      return null;
    }

    return routeToEntity(route);
  }

  public async create(createRouteDto: CreateRouteDto) {
    const route = await this._prisma.route.create({
      data: {
        ...createRouteDto,
      },
    });

    if (!route) {
      return null;
    }

    return routeToEntity(route);
  }

  public async update(routeId: string, updateDto: CreateRouteDto) {
    const route = await this._prisma.route.update({
      where: {
        id: routeId,
      },
      data: {
        ...updateDto,
      },
    });

    if (!route) {
      return null;
    }

    return routeToEntity(route);
  }
}
