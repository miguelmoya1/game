import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserEntity } from '../../../domain/entities';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserEntity;
  }
}

export const AuthenticatedUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    const user = request.user;

    if (data && user && data in user) {
      return user[data as keyof UserEntity];
    }

    return user;
  },
);
