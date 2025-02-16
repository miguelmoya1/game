import { RouteBuilder } from '@game/builder';
import { RouteEntity } from '@game/entities';
import { Route } from '@prisma/client';

export const routeToEntity = (route: Route): RouteEntity => {
  return new RouteBuilder(route.id, route.createdAt, route.updatedAt, route.deletedAt)
    .withPath(route.path)
    .withMethod(route.method)
    .withBody(route.body)
    .withProjectId(route.projectId)

    .build();
};
