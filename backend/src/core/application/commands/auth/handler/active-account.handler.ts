import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from '../../../../infrastructure/repositories';
import { ActiveAccountCommand } from '../impl/active-account.command';

@CommandHandler(ActiveAccountCommand)
export class ActiveAccountHandler
  implements ICommandHandler<ActiveAccountCommand>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
  ) {}

  async execute(command: ActiveAccountCommand) {
    const { accountId } = command;

    const account = await this._accountRepository.active(accountId);

    if (!account) {
      throw new HttpException(
        ErrorCodes.CANNOT_ACTIVATE_ACCOUNT,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
