import { equal, ok } from 'node:assert';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import { addProviders, inject, resetProviders } from '../../../../di/di-manager.ts';
import { Account, AccountProvider } from '../../../domain/entities/account.entity.ts';
import { ErrorCodes } from '../../../domain/enums/error-codes.enum.ts';
import { ACCOUNT_REPOSITORY } from '../../../domain/interfaces/account.repository.ts';
import { USER_REPOSITORY } from '../../../domain/interfaces/user.repository.ts';
import { AccountRepositoryMock } from '../../../infrastructure/repositories/account.repository.mock.ts';
import { UserRepositoryMock } from '../../../infrastructure/repositories/user.repository.mock.ts';
import { EMAIL_SERVICE } from '../../services/email/email.service.contract.ts';
import { ENCRYPTION_SERVICE } from '../../services/encryption/encryption.service.contract.ts';
import { AccountUseCaseImpl } from './account.use-case.ts';

describe('AccountUseCaseImpl', () => {
  let accountUseCase: AccountUseCaseImpl;

  beforeEach(async () => {
    await addProviders([
      {
        provide: ACCOUNT_REPOSITORY,
        useClass: AccountRepositoryMock,
      },
      {
        provide: USER_REPOSITORY,
        useClass: UserRepositoryMock,
      },
      {
        provide: EMAIL_SERVICE,
        useValue: {
          sendPasswordResetEmail: async () => true,
        },
      },
      {
        provide: ENCRYPTION_SERVICE,
        useValue: {
          encrypt: async (value: string) => value,
          compare: async (value: string, hash: string) => value === hash,
        },
      },
    ]);

    accountUseCase = new AccountUseCaseImpl();
  });

  afterEach(async () => {
    resetProviders();
    mock.restoreAll();
  });

  describe('changePassword', () => {
    it('should change the password', async () => {
      mock.method(AccountRepositoryMock.prototype, 'findByHash').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            hashForPasswordReset: 'hash',
            hashExpiredAt: new Date(Date.now() + 1000),
          } as any),
      );

      const result = await accountUseCase.changePassword('hash', 'newPassword');

      ok(result);
    });

    it('should call the repository function', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'changePassword');

      equal(fnMock.mock.callCount(), 0);
      await accountUseCase.changePassword('hash', 'newPassword');
      equal(fnMock.mock.callCount(), 1);
    });

    it('should call the encryption service', async () => {
      const encryptionService = inject(ENCRYPTION_SERVICE);

      const fnMock = mock.method(encryptionService, 'encrypt');

      equal(fnMock.mock.callCount(), 0);
      await accountUseCase.changePassword('hash', 'newPassword');

      equal(fnMock.mock.callCount(), 1);
      equal(fnMock.mock.calls[0].arguments[0], 'newPassword');
    });

    it('should throw an error if the account is not found', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'findByHash');
      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.changePassword('hash', 'newPassword');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ACCOUNT_NOT_FOUND);
      }
    });

    it('should throw an error if the hashExpiredAt is not present', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'findByHash');
      fnMock.mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            hashForPasswordReset: 'hash',
          } as any),
      );

      try {
        await accountUseCase.changePassword('hash', 'newPassword');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ACCOUNT_NOT_FOUND);
      }
    });

    it('should throw an error if the hash is expired', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'findByHash');
      fnMock.mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            hashForPasswordReset: 'hash',
            hashExpiredAt: new Date(Date.now() - 1000),
          } as any),
      );

      try {
        await accountUseCase.changePassword('hash', 'newPassword');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.HASH_EXPIRED);
      }
    });

    it('should throw an error if the account is not updated', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'changePassword');
      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.changePassword('hash', 'newPassword');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ACCOUNT_NOT_FOUND);
      }
    });
  });

  describe('create', () => {
    it('should create an account', async () => {
      const account = await accountUseCase.create(
        { name: 'John Doe' },
        { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
      );

      ok(account);

      equal(account.name, 'John Doe');
    });

    it('should call the user repository create function', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'create');

      equal(fnMock.mock.callCount(), 0);
      await accountUseCase.create(
        { name: 'John Doe' },
        { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
      );

      equal(fnMock.mock.callCount(), 1);

      const args = fnMock.mock.calls[0].arguments;

      equal(args[0].provider, AccountProvider.EMAIL);
      equal(args[0].email, 'john.doe@example.com');
    });

    it('should encrypt the password', async () => {
      const encryptionService = inject(ENCRYPTION_SERVICE);

      const fnMock = mock.method(encryptionService, 'encrypt');

      fnMock.mock.mockImplementationOnce(async (password: string) => `encrypted_${password}`);

      equal(fnMock.mock.callCount(), 0);
      await accountUseCase.create(
        { name: 'John Doe' },
        { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
      );

      equal(fnMock.mock.callCount(), 1);
      equal(fnMock.mock.calls[0].arguments[0], 'password');
    });

    it('should call the account repository create function', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'create');

      equal(fnMock.mock.callCount(), 0);
      await accountUseCase.create(
        { name: 'John Doe' },
        { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
      );

      equal(fnMock.mock.callCount(), 1);

      const args = fnMock.mock.calls[0].arguments;

      equal(args[0].provider, AccountProvider.EMAIL);
    });

    it('should throw an error if the user is not created', async () => {
      const fnMock = mock.method(UserRepositoryMock.prototype, 'create');
      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.create(
          { name: 'John Doe' },
          { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
        );

        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ERROR_REGISTERING_USER);
      }
    });

    it('should throw an error if the account is not created', async () => {
      const fnMock = mock.method(AccountRepositoryMock.prototype, 'create');
      fnMock.mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.create(
          { name: 'John Doe' },
          { provider: AccountProvider.EMAIL, email: 'john.doe@example.com', providerId: '123', password: 'password' },
        );
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ERROR_REGISTERING_USER);
      }
    });
  });

  describe('forgotPassword', () => {
    it('should send a password reset email', async () => {
      const emailService = inject(EMAIL_SERVICE);
      const sendEmailMock = mock.method(emailService, 'sendPasswordResetEmail');

      mock.method(AccountRepositoryMock.prototype, 'forgotPassword').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
          } as any),
      );

      mock
        .method(UserRepositoryMock.prototype, 'findById')
        .mock.mockImplementationOnce(async () => ({ id: '1', name: 'John Doe' } as any));

      const result = await accountUseCase.forgotPassword('john.doe@example.com');

      ok(result);
      equal(sendEmailMock.mock.callCount(), 1);
    });

    it('should throw an error if the account is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'forgotPassword').mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.forgotPassword('john.doe@example.com');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ACCOUNT_NOT_FOUND);
      }
    });

    it('should throw an error if the user is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'forgotPassword').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
          } as any),
      );

      mock.method(UserRepositoryMock.prototype, 'findById').mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.forgotPassword('john.doe@example.com');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_NOT_FOUND);
      }
    });
  });

  describe('confirm', () => {
    it('should confirm the account', async () => {
      mock.method(AccountRepositoryMock.prototype, 'confirm').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
          } as any),
      );

      mock
        .method(UserRepositoryMock.prototype, 'findById')
        .mock.mockImplementationOnce(async () => ({ id: '1', name: 'John Doe' } as any));

      const result = await accountUseCase.confirm('1');

      ok(result);
      equal(result.name, 'John Doe');
    });

    it('should throw an error if the account is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'confirm').mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.confirm('1');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.CANNOT_ACTIVATE_ACCOUNT);
      }
    });

    it('should throw an error if the user is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'confirm').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
          } as any),
      );

      mock.method(UserRepositoryMock.prototype, 'findById').mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.confirm('1');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_NOT_FOUND);
      }
    });
  });

  describe('getById', () => {
    it('should return the account by ID', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getById').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
          } as any),
      );

      const result = await accountUseCase.getById('1');

      ok(result);
      equal(result.id, '1');
    });

    it('should throw an error if the account is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getById').mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.getById('1');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.ACCOUNT_NOT_FOUND);
      }
    });
  });

  describe('signInWithEmail', () => {
    it('should sign in with email and password', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getOneByProviderEmail').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
            password: 'encrypted_password',
          } as any),
      );

      mock
        .method(UserRepositoryMock.prototype, 'findById')
        .mock.mockImplementationOnce(async () => ({ id: '1', name: 'John Doe' } as any));

      const encryptionService = inject(ENCRYPTION_SERVICE);
      mock.method(encryptionService, 'compare').mock.mockImplementationOnce(async () => true);

      const result = await accountUseCase.signInWithEmail('john.doe@example.com', 'password');

      ok(result);
      equal(result.name, 'John Doe');
    });

    it('should throw an error if the account is not found', async () => {
      mock
        .method(AccountRepositoryMock.prototype, 'getOneByProviderEmail')
        .mock.mockImplementationOnce(async () => null);

      try {
        await accountUseCase.signInWithEmail('john.doe@example.com', 'password');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_OR_PASSWORD_INVALID);
      }
    });

    it('should throw an error if the password is not present', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getOneByProviderEmail').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
          } as any),
      );

      try {
        await accountUseCase.signInWithEmail('john.doe@example.com', 'password');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_OR_PASSWORD_INVALID);
      }
    });

    it('should throw an error if the password is invalid', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getOneByProviderEmail').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
            password: 'encrypted_password',
          } as any),
      );

      const encryptionService = inject(ENCRYPTION_SERVICE);
      mock.method(encryptionService, 'compare').mock.mockImplementationOnce(async () => false);

      try {
        await accountUseCase.signInWithEmail('john.doe@example.com', 'password');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_OR_PASSWORD_INVALID);
      }
    });

    it('should throw an error if the user is not found', async () => {
      mock.method(AccountRepositoryMock.prototype, 'getOneByProviderEmail').mock.mockImplementationOnce(
        async () =>
          new Account({
            id: '1',
            userId: '1',
            provider: AccountProvider.EMAIL,
            email: 'john.doe@example.com',
            password: 'encrypted_password',
          } as any),
      );

      mock.method(UserRepositoryMock.prototype, 'findById').mock.mockImplementationOnce(async () => null);

      const encryptionService = inject(ENCRYPTION_SERVICE);
      mock.method(encryptionService, 'compare').mock.mockImplementationOnce(async () => true);

      try {
        await accountUseCase.signInWithEmail('john.doe@example.com', 'password');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        ok(error);
        equal(error.message, ErrorCodes.USER_OR_PASSWORD_INVALID);
      }
    });
  });
});
