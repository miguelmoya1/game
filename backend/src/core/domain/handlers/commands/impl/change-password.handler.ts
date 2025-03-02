import { ChangePasswordCommand } from '@game/commands';
import { ACCOUNT_USE_CASE, AccountUseCase } from '@game/use-cases-contracts';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(@Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase) {}

  async execute(command: ChangePasswordCommand) {
    const { hashForPasswordReset, password } = command;

    await this._accountUseCase.changePassword(hashForPasswordReset, password);
  }
}
