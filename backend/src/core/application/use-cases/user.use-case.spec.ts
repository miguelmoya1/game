import assert from 'node:assert';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import { addProviders, resetProviders } from '../../../di/di-manager.ts';
import { User, UserRole } from '../../domain/entities/user.entity.ts';
import { ErrorCodes } from '../../domain/enums/error-codes.enum.ts';
import { USER_REPOSITORY } from '../../domain/interfaces/user.repository.ts';
import { UserRepositoryMock } from '../../infrastructure/repositories/user.repository.mock.ts';
import { UserUseCaseImpl } from './user.use-case.ts';

describe('UserUseCaseImpl', () => {
  let userUseCase: UserUseCaseImpl;

  beforeEach(async () => {
    await addProviders([
      {
        provide: USER_REPOSITORY,
        useClass: UserRepositoryMock,
      },
    ]);

    userUseCase = new UserUseCaseImpl();
  });

  afterEach(() => {
    resetProviders();
    mock.restoreAll();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = await userUseCase.create({ name: 'John Doe' });

      assert.ok(user);
      assert.equal(user.name, 'John Doe');
    });

    it('should call the repository function', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'create');

      assert.equal(fnMock.mock.callCount(), 0);
      await userUseCase.create({ name: 'test' });
      assert.equal(fnMock.mock.callCount(), 1);
    });

    it('should call the repository with the correct data', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'create');
      const args = { name: 'test' };

      await userUseCase.create(args);
      assert.deepEqual(fnMock.mock.calls[0].arguments, [args]);
    });

    it('should throw an error if the user is not created', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'create');
      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await userUseCase.create({ name: 'test' });
      } catch (error) {
        assert.ok(error);
        assert.equal(error.message, ErrorCodes.USER_NOT_CREATED);
      }
    });
  });

  describe('getById', () => {
    it('should get a user by id', async () => {
      const user = await userUseCase.getById('1');

      assert.ok(user);
    });

    it('should call the repository function', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'findById');

      assert.equal(fnMock.mock.callCount(), 0);
      await userUseCase.getById('1');
      assert.equal(fnMock.mock.callCount(), 1);
    });

    it('should call the repository with the correct data', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'findById');
      const args = '1';

      await userUseCase.getById(args);
      assert.deepEqual(fnMock.mock.calls[0].arguments, [args]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = await userUseCase.update({ nickname: 'Jane Doe' }, '1', new User({ role: UserRole.ADMIN } as any));

      assert.ok(user);
    });

    it('should call the repository function', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'update');

      assert.equal(fnMock.mock.callCount(), 0);
      await userUseCase.update({ nickname: 'Jane Doe' }, '1', new User({ role: UserRole.ADMIN } as any));
      assert.equal(fnMock.mock.callCount(), 1);
    });

    it('should call the repository with the correct data if is an admin', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'update');

      await userUseCase.update({ nickname: 'Jane Doe' }, '1', new User({ role: UserRole.ADMIN } as any));

      assert.deepEqual(fnMock.mock.calls[0].arguments, ['1', { nickname: 'Jane Doe' }]);
    });

    it('should throw an error if the user is not an admin', async () => {
      try {
        await userUseCase.update({ nickname: 'Jane Doe' }, '1', new User({ role: UserRole.USER } as any));
      } catch (error) {
        assert.ok(error);
        assert.equal(error.message, ErrorCodes.UNAUTHORIZED);
      }
    });

    it('should call the repository with the correct data if is the owner', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'update');

      await userUseCase.update({ nickname: 'Jane Doe' }, '1', new User({ id: '1' } as any));

      assert.deepEqual(fnMock.mock.calls[0].arguments, ['1', { nickname: 'Jane Doe' }]);
    });

    it('should throw an error if the user is not the owner', async () => {
      try {
        await userUseCase.update({ nickname: 'Jane Doe' }, '2', new User({ id: '1' } as any));
      } catch (error) {
        assert.ok(error);
        assert.equal(error.message, ErrorCodes.UNAUTHORIZED);
      }
    });

    it('should throw an error if the user is not found', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'update');

      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await userUseCase.update({ nickname: 'User' }, '1', new User({ id: '1' } as any));
      } catch (error) {
        assert.ok(error);
        assert.equal(error.message, ErrorCodes.USER_NOT_FOUND);
      }
    });
  });
});
