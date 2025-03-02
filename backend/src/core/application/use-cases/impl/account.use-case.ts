import { CreateAccountDto, CreateUserDto } from '@game/data/dto';
import { AccountProvider, User } from '@game/entities';
import { ErrorCodes } from '@game/enums';
import { LoginEmailCreatedEvent } from '@game/events';
import { ACCOUNT_REPOSITORY, AccountRepository, USER_REPOSITORY, UserRepository } from '@game/interfaces';
import { EmailService, EncryptionService } from '@game/services';
import { AccountUseCase } from '@game/use-cases-contracts';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

@Injectable()
export class AccountUseCaseImpl implements AccountUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService,
    private readonly _encryptionService: EncryptionService,
    private readonly _emailService: EmailService,
    private readonly _eventBus: EventBus,
  ) {}

  public async changePassword(hashForPasswordReset: string, password: string) {
    const accountDb = await this._accountRepository.findByHash(hashForPasswordReset);

    if (!accountDb) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    if (!accountDb.hashExpiredAt) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    if (accountDb.hashExpiredAt < new Date()) {
      throw new Error(ErrorCodes.HASH_EXPIRED);
    }

    const encryptedPassword = await this._encryptionService.encrypt(password);
    const { id } = accountDb;
    const account = this._accountRepository.changePassword(id, encryptedPassword);

    if (!account) {
      throw new Error(ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    return !!account;
  }

  public async rehydrate(user: User) {
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

    this._emailService.sendForgotPassword(account, user);

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

  public async create(createUserDto: CreateUserDto, createAccountDto: CreateAccountDto) {
    const user = await this._userRepository.create(createUserDto);

    if (!user) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    if (createAccountDto.password && createAccountDto.provider === AccountProvider.EMAIL) {
      createAccountDto.password = await this._encryptionService.encrypt(createAccountDto.password);
    }

    const account = await this._accountRepository.create(createAccountDto, {
      userId: user.id,
      isPrimary: true,
    });

    if (!account) {
      throw new Error(ErrorCodes.ERROR_REGISTERING_USER);
    }

    this._eventBus.publishAll([new LoginEmailCreatedEvent(account.id, user.id)]);

    return this.#generateToken(user);
  }

  public async signInWithEmail(email: string, password: string) {
    const result = await this._accountRepository.getOneByProviderEmail(email);

    if (!result) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    if (!result.password) {
      throw new Error(ErrorCodes.USER_OR_PASSWORD_INVALID);
    }

    const isPasswordValid = await this._encryptionService.compare(password, result.password);

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
    return this._jwtService.sign({ sub: user.id });
  }
}
