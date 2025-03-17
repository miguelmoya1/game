import { createHash } from 'crypto';
import { inject } from '../../../di/di-manager.ts';
import { AccountProvider } from '../../domain/entities/account.entity.ts';
import { ErrorCodes } from '../../domain/enums/error-codes.enum.ts';
import { ACCOUNT_REPOSITORY } from '../../domain/interfaces/account.repository.ts';
import { USER_REPOSITORY } from '../../domain/interfaces/user.repository.ts';
import type { AccountUseCase } from '../../domain/use-cases/account.use-case.contract.ts';
import type { CreateAccountDto } from '../../infrastructure/data/dtos/auth/create-account.dto.ts';
import type { CreateUserDto } from '../../infrastructure/data/dtos/user/create-user.dto.ts';
import { EMAIL_SERVICE } from '../services/email/email.service.contract.ts';
import { ENCRYPTION_SERVICE } from '../services/encryption/encryption.service.contract.ts';

export class AccountUseCaseImpl implements AccountUseCase {
  readonly #accountRepository = inject(ACCOUNT_REPOSITORY);
  readonly #encryptionService = inject(ENCRYPTION_SERVICE);
  readonly #emailService = inject(EMAIL_SERVICE);
  readonly #userRepository = inject(USER_REPOSITORY);

  public async changePassword(hashForPasswordReset: string, password: string) {
    const accountDb = await this.#accountRepository.findByHash(hashForPasswordReset);

    if (!accountDb) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    if (!accountDb.hashExpiredAt) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    if (accountDb.hashExpiredAt < new Date()) {
      throw new Error(ErrorCodes.HASH_EXPIRED);
    }

    const encryptedPassword = await this.#encryptionService.encrypt(password);

    const { id } = accountDb;

    const account = await this.#accountRepository.changePassword(id, encryptedPassword);

    if (!account) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    return !!account;
  }

  public async forgotPassword(email: string) {
    const uuid = createHash('sha256').update(email).digest('hex');
    const account = await this.#accountRepository.forgotPassword(email, uuid);

    if (!account) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    const user = await this.#userRepository.findById(account.id);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    this.#emailService.sendPasswordResetEmail(account, user);

    return account;
  }

  public async confirm(accountId: string) {
    const account = await this.#accountRepository.confirm(accountId);

    if (!account) {
      throw new Error(ErrorCodes.CANNOT_ACTIVATE_ACCOUNT);
    }

    const { userId } = account;

    const user = await this.#userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    return user;
  }

  public async getById(accountId: string) {
    const response = await this.#accountRepository.getById(accountId);

    if (!response) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    return response;
  }

  public async create(createUserDto: CreateUserDto, createAccountDto: CreateAccountDto) {
    const user = await this.#userRepository.create(createUserDto);

    if (!user) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    if (createAccountDto.password && createAccountDto.provider === AccountProvider.EMAIL) {
      createAccountDto.password = await this.#encryptionService.encrypt(createAccountDto.password);
    }

    const account = await this.#accountRepository.create(createAccountDto, {
      userId: user.id,
      isPrimary: true,
    });

    if (!account) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    return user;
  }

  public async signInWithEmail(email: string, password: string) {
    const result = await this.#accountRepository.getOneByProviderEmail(email);

    if (!result) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    if (!result.password) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    const isPasswordValid = await this.#encryptionService.compare(password, result.password);

    if (!isPasswordValid) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    const { userId } = result;

    const user = await this.#userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    return user;
  }
}
