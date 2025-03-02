import { LoginEmailCreatedEvent } from '@game/events';
import { EmailService } from '@game/services';
import { ACCOUNT_USE_CASE, AccountUseCase, USER_USE_CASE, UserUseCase } from '@game/use-cases-contracts';
import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(LoginEmailCreatedEvent)
export class LoginEmailCreatedHandler implements IEventHandler<LoginEmailCreatedEvent> {
  #logger = new Logger(LoginEmailCreatedHandler.name);
  constructor(
    private readonly _emailService: EmailService,
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
    @Inject(USER_USE_CASE) private readonly _userUseCase: UserUseCase,
  ) {}

  async handle(event: LoginEmailCreatedEvent) {
    const account = await this._accountUseCase.getById(event.accountId);
    const user = await this._userUseCase.getById(event.userId);

    if (!account || !user) {
      this.#logger.error(`Account or user not found. AccountId: ${event.accountId}, UserId: ${event.userId}`);
      return;
    }

    await this._emailService.sendConfirmEmail(account, user);
  }
}
