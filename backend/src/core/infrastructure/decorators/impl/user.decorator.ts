import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { User } from '../../../domain/entities';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export const AuthenticatedUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    const user = request.user;

    if (data && user && data in user) {
      return user[data as keyof User];
    }

    return user;
  },
);
