import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createHash } from 'crypto';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../../../infrastructure/repositories';
import { EMAIL_SERVICE, EmailService } from '../../../services';
import { ForgotPasswordCommand } from '../impl/forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: UserRepository,
    @Inject(EMAIL_SERVICE)
    private readonly _emailService: EmailService,
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const { email } = command;

    const hashForPasswordReset = createHash('sha256')
      .update(email)
      .digest('hex');

    const account = await this._accountRepository.forgotPassword(
      email,
      hashForPasswordReset,
    );

    if (!account) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this._userRepository.findById(account.userId);

    if (!user) {
      throw new HttpException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this._emailService.sendPasswordResetEmail(account, user);
  }
}
