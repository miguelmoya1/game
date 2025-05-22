import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/core/application/events/impl/user-created.event';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../../../infrastructure/repositories';
import {
  EMAIL_SERVICE,
  EmailService,
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../../services';
import { RegisterCommand } from '../impl/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountUseCase: AccountRepository,
    @Inject(USER_REPOSITORY) private readonly _userUseCase: UserRepository,
    @Inject(EMAIL_SERVICE)
    private readonly _emailService: EmailService,
    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RegisterCommand) {
    const { createAccountDto, createUserDto } = command;

    const existingAccount = await this._accountUseCase.getOneByProviderEmail(
      createAccountDto.email,
    );

    if (existingAccount) {
      throw new HttpException(
        ErrorCodes.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const user = await this._userUseCase.create(createUserDto);

    if (!user) {
      throw new HttpException(
        ErrorCodes.USER_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }

    let password = createAccountDto.password;
    if (password) {
      password = await this._encryptionService.encrypt(password);
    }

    const account = await this._accountUseCase.create({
      ...createAccountDto,
      password,
      userId: user.id,
    });

    if (!account) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.eventBus.publish(new UserCreatedEvent(user.id));

    await this._emailService.sendConfirmationEmail(account, user);
  }
}
