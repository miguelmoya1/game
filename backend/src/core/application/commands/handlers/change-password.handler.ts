import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
import { ChangePasswordCommand } from '../impl/change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { hashForPasswordReset, password } = command;

    await this._accountUseCase.changePassword(hashForPasswordReset, password);
  }
}
