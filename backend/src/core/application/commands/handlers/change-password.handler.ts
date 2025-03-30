import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountUseCase } from '../../use-cases';
import { ACCOUNT_USE_CASE } from '../../use-cases/contracts/account.use-case.contract';
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
