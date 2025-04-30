import { FastifyRequest } from 'fastify';

export class GetTranslateQuery {
  constructor(
    public readonly req: FastifyRequest,
    public readonly lang?: string,
  ) {}
}
