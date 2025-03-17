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
});
