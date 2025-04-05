import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountProvider } from '@prisma/client';
import { createHash } from 'crypto';
import { User } from '../../../domain/entities';
import { ErrorCodes } from '../../../domain/enums';
import { CreateAccountDto, CreateUserDto } from '../../../infrastructure/dto';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../../infrastructure/repositories';
import {
  EMAIL_SERVICE,
  EmailService,
} from '../../services/email/email.service.contract';
import {
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../services/encryption/encryption.service.contract';
import { AccountUseCase } from '../contracts/account.use-case.contract';

@Injectable()
export class AccountUseCaseImpl implements AccountUseCase {
  constructor(
    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: UserRepository,
    @Inject(EMAIL_SERVICE)
    private readonly _emailService: EmailService,
    private readonly _jwtService: JwtService,
  ) {}

  public async changePassword(hashForPasswordReset: string, password: string) {
    const accountDb =
      await this._accountRepository.findByHash(hashForPasswordReset);

    if (!accountDb) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    if ((accountDb.hashExpiredAt || 0) < new Date()) {
      throw new Error(ErrorCodes.HASH_EXPIRED);
    }

    const encryptedPassword = await this._encryptionService.encrypt(password);
    const { id } = accountDb;
    const account = await this._accountRepository.changePassword(
      id,
      encryptedPassword,
    );

    if (!account) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    return !!account;
  }

  public rehydrate(user: User) {
    return this.#generateToken(user);
  }

  public async forgotPassword(email: string) {
    const uuid = createHash('sha256').update(email).digest('hex');
    const account = await this._accountRepository.forgotPassword(email, uuid);

    if (!account) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    const user = await this._userRepository.findById(account.id);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    await this._emailService.sendPasswordResetEmail(account, user);

    return account;
  }

  public async confirm(accountId: string) {
    const response = await this._accountRepository.confirm(accountId);

    if (!response) {
      throw new Error(ErrorCodes.CANNOT_ACTIVATE_ACCOUNT);
    }

    const { userId } = response;

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    return this.#generateToken(user);
  }

  public async getById(accountId: string) {
    const response = await this._accountRepository.getById(accountId);

    if (!response) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    return response;
  }

  public async create(
    createUserDto: CreateUserDto,
    createAccountDto: CreateAccountDto,
  ) {
    const user = await this._userRepository.create(createUserDto);

    if (!user) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    if (createAccountDto.provider === AccountProvider.EMAIL) {
      createAccountDto.password = await this._encryptionService.encrypt(
        createAccountDto.password!,
      );
    }

    const account = await this._accountRepository.create(createAccountDto, {
      userId: user.id,
      isPrimary: true,
    });

    if (!account) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    return this.#generateToken(user);
  }

  public async signInWithEmail(email: string, password: string) {
    const result = await this._accountRepository.getOneByProviderEmail(email);

    if (!result) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    const isPasswordValid = await this._encryptionService.compare(
      password,
      result.password!,
    );

    if (!isPasswordValid) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    const { userId } = result;

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    return this.#generateToken(user);
  }

  #generateToken(user: User) {
    return Promise.resolve(this._jwtService.sign({ ...user }));
  }
}
