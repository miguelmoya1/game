import type { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../domain/entities/user.entity.ts';
import { ErrorCodes } from '../../domain/enums/error-codes.enum.ts';

declare module 'fastify' {
  interface FastifyRequest {
    userDb?: User;
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await request.jwtVerify();

    request.userDb = user as User;
  } catch (error) {
    reply.status(401).send({ message: ErrorCodes.UNAUTHORIZED });
  }
}
