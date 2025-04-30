import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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
} from '../../../services/email/email.service.contract';
import { RegisterCommand } from '../impl/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountUseCase: AccountRepository,
    @Inject(USER_REPOSITORY) private readonly _userUseCase: UserRepository,
    @Inject(EMAIL_SERVICE)
    private readonly _emailService: EmailService,
  ) {}

  async execute(command: RegisterCommand) {
    const { createAccountDto, createUserDto } = command;

    const user = await this._userUseCase.create(createUserDto);

    if (!user) {
      throw new HttpException(
        ErrorCodes.USER_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this._accountUseCase.create({
      ...createAccountDto,
      userId: user.id,
    });

    if (!account) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._emailService.sendConfirmationEmail(account, user);
  }
}
