import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
import { ForgotPasswordCommand } from '../impl/forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(command: ForgotPasswordCommand) {
    const { email } = command;

    await this._accountUseCase.forgotPassword(email);
  }
}
