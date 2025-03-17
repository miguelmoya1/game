import type { FastifyReply, FastifyRequest } from 'fastify';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { ErrorCodes } from '../../domain/enums/error-codes.enum.ts';
import { authMiddleware } from './auth.guard.ts';

describe('authMiddleware', () => {
  it('should verify JWT and set userDb on request', async () => {
    const request = {
      jwtVerify: async () => ({ id: 1, name: 'Test User' }),
    } as FastifyRequest;
    const reply = {} as FastifyReply;

    await authMiddleware(request, reply);

    assert.strictEqual(request.userDb?.id, 1);
    assert.strictEqual(request.userDb?.name, 'Test User');
  });

  it('should return 401 if JWT verification fails', async () => {
    const request = {
      jwtVerify: async () => {
        throw new Error('Invalid token');
      },
    } as unknown as FastifyRequest;

    const reply = {
      status: function (code: number) {
        assert.strictEqual(code, 401);
        return this;
      },
      send: function (payload: object) {
        assert.deepStrictEqual(payload, { message: ErrorCodes.UNAUTHORIZED });
      },
    } as FastifyReply;

    await authMiddleware(request, reply);
  });
});
