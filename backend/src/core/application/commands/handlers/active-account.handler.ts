import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
import { ActiveAccountCommand } from '../impl/active-account.command';

@CommandHandler(ActiveAccountCommand)
export class ActiveAccountHandler
  implements ICommandHandler<ActiveAccountCommand>
{
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(command: ActiveAccountCommand) {
    const { accountId } = command;

    return await this._accountUseCase.confirm(accountId);
  }
}
