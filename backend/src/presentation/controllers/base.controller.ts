import type { FastifyInstance } from 'fastify';
import { inject } from '../../di/di-manager.ts';
import { FASTIFY } from '../../di/fastify.provider.ts';

export abstract class BaseController {
  protected readonly fastify = inject(FASTIFY);
  protected readonly logger = this.fastify.log;

  constructor(prefix: string) {
    this.fastify.register(
      (fastify) => {
        this.logger.debug(`${this.constructor.name} ${prefix}`);
        this.initRoutes(fastify);
      },
      { prefix },
    );
  }

  protected abstract initRoutes(fastify: FastifyInstance): void;
}
