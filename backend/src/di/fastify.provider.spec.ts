import type { FastifyInstance } from 'fastify';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addProviders, inject, resetProviders } from './di-manager.ts';
import { FASTIFY } from './fastify.provider.ts';

describe('FastifyProvider', () => {
  it('should add and inject Fastify instance correctly', async () => {
    resetProviders();
    const fastifyInstance: FastifyInstance = {} as FastifyInstance;

    await addProviders([
      {
        provide: FASTIFY,
        useValue: fastifyInstance,
      },
    ]);

    const injectedInstance = inject(FASTIFY);
    assert.strictEqual(injectedInstance, fastifyInstance);
  });

  it('should throw an error if Fastify instance is not found', () => {
    resetProviders();
    assert.throws(() => inject(FASTIFY), /Dependency not found/);
  });

  it('should support useFactory for Fastify instance', async () => {
    resetProviders();
    const fastifyInstance: FastifyInstance = {} as FastifyInstance;

    await addProviders([
      {
        provide: FASTIFY,
        useFactory: () => fastifyInstance,
      },
    ]);

    const injectedInstance = inject(FASTIFY);
    assert.strictEqual(injectedInstance, fastifyInstance);
  });

  it('should support useClass for Fastify instance', async () => {
    resetProviders();
    class FastifyService {
      instance: FastifyInstance = {} as FastifyInstance;
    }

    await addProviders([
      {
        provide: FASTIFY,
        useClass: FastifyService,
      },
    ]);

    const injectedService = inject(FASTIFY);
    assert.ok(injectedService instanceof FastifyService);
    assert.strictEqual(injectedService.instance, injectedService.instance);
  });

  it('should reset providers correctly', async () => {
    resetProviders();
    const fastifyInstance: FastifyInstance = {} as FastifyInstance;

    await addProviders([
      {
        provide: FASTIFY,
        useValue: fastifyInstance,
      },
    ]);

    resetProviders();
    assert.throws(() => inject(FASTIFY), /Dependency not found/);
  });
});
