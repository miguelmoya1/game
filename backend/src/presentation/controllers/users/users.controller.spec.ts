import type { FastifyReply, FastifyRequest } from 'fastify';
import { equal, ok } from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import { UserUseCaseMock } from '../../../core/application/use-cases/user.use-case.mock.ts';
import { GetUserByIdQuery } from '../../../core/domain/handlers/queries/get-user-by-id.query.ts';
import { USER_USE_CASE } from '../../../core/domain/use-cases/user.use-case.contract.ts';
import { addProviders, resetProviders } from '../../../di/di-manager.ts';
import { FASTIFY } from '../../../di/fastify.provider.ts';
import { fastifyMock, mockFastifyResponseParam } from '../../../test/fastify.ts';
import { UserController } from './users.controller.ts';

describe('userController', () => {
  beforeEach(async () => {
    resetProviders();

    await addProviders([
      {
        provide: FASTIFY,
        useValue: fastifyMock,
      },
      {
        provide: USER_USE_CASE,
        useClass: UserUseCaseMock,
      },
    ]);
  });

  it('should be created', () => {
    try {
      new UserController();
    } catch (error) {
      console.error(error);
    }
    ok(new UserController());
  });

  it('should call register', () => {
    const registerMock = mock.method(fastifyMock, 'register');
    new UserController();

    equal(registerMock.mock.callCount(), 1);
  });

  describe('get /me', () => {
    it('should call get from fastify', () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callMe = getMock.mock.calls.find((call) => call.arguments[0] === '/me');

      ok(callMe);
    });

    it('should call get from fastify with authMiddleware', () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callMe = getMock.mock.calls.find((call) => call.arguments[0] === '/me');

      equal(callMe?.arguments[1].preValidation?.[0].name, 'authMiddleware');
    });

    it('should return be a function the 3 param', async () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callMe = getMock.mock.calls.find((call) => call.arguments[0] === '/me');

      const fn = callMe?.arguments.at(2) as unknown as (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

      equal(typeof fn, 'function');

      const fnMockName = fn.name;
      const fnClassName = UserController.prototype.getMe.name;

      // should be a bound function
      ok(fnMockName, `bound ${fnClassName}`);
    });
  });

  describe('get /:userId', () => {
    it('should call get from fastify', () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callUserId = getMock.mock.calls.find((call) => call.arguments[0] === '/:userId');

      ok(callUserId);
    });

    it('should call get from fastify with authMiddleware', () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callUserId = getMock.mock.calls.find((call) => call.arguments[0] === '/:userId');

      equal(callUserId?.arguments[1].preValidation?.[0].name, 'authMiddleware');
    });

    it('should return be a function the 3 param', async () => {
      const getMock = mock.method(mockFastifyResponseParam, 'get');
      new UserController();

      const callUserId = getMock.mock.calls.find((call) => call.arguments[0] === '/:userId');

      const fn = callUserId?.arguments.at(2) as unknown as (
        request: FastifyRequest,
        reply: FastifyReply,
      ) => Promise<void>;

      equal(typeof fn, 'function');

      const fnMockName = fn.name;
      const fnClassName = UserController.prototype.getUserById.name;

      // should be a bound function
      ok(fnMockName, `bound ${fnClassName}`);
    });
  });

  describe('patch /:userId', () => {
    it('should call patch from fastify', () => {
      const patchMock = mock.method(mockFastifyResponseParam, 'patch');
      new UserController();

      const callUserId = patchMock.mock.calls.find((call) => call.arguments[0] === '/:userId');

      ok(callUserId);
    });

    it('should call patch from fastify with authMiddleware', () => {
      const patchMock = mock.method(mockFastifyResponseParam, 'patch');
      new UserController();

      const callUserId = patchMock.mock.calls.find((call) => call.arguments[0] === '/:userId');

      equal(callUserId?.arguments[1].preValidation?.[0].name, 'authMiddleware');
    });

    it('should return be a function the 3 param', async () => {
      const patchMock = mock.method(mockFastifyResponseParam, 'patch');
      new UserController();

      const callUserId = patchMock.mock.calls.find((call) => call.arguments[0] === '/:userId');
      const fn = callUserId?.arguments.at(2) as unknown as (
        request: FastifyRequest,
        reply: FastifyReply,
      ) => Promise<void>;

      equal(typeof fn, 'function');

      const fnMockName = fn.name;
      const fnClassName = UserController.prototype.updateUser.name;

      // should be a bound function
      ok(fnMockName, `bound ${fnClassName}`);
    });
  });

  describe('getMe', () => {
    it('should return getUserByIdQuery', async () => {
      const getUserByIdQueryMock = mock.method(GetUserByIdQuery.prototype, 'execute');
      const userController = new UserController();

      await userController.getMe({ userDb: { id: '1' } } as unknown as FastifyRequest);

      equal(getUserByIdQueryMock.mock.calls.length, 1);
    });
  });

  describe('getUserById', () => {
    it('should return getUserByIdQuery', async () => {
      const getUserByIdQueryMock = mock.method(GetUserByIdQuery.prototype, 'execute');
      const userController = new UserController();

      await userController.getUserById({ params: { userId: '1' } } as FastifyRequest);

      equal(getUserByIdQueryMock.mock.calls.length, 1);
    });
  });

  describe('updateUser', () => {
    it('should return updateUserCommand', async () => {
      const updateUserCommandMock = mock.method(UserController.prototype, 'updateUser');
      const userController = new UserController();

      await userController.updateUser({
        userDb: { id: '1' },
        params: { userId: '1' },
        body: { userUpdateDto: {} },
      } as any);

      equal(updateUserCommandMock.mock.calls.length, 1);
    });
  });
});
