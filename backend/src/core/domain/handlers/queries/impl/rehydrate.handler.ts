import { RehydrateQuery } from '@game/queries';
import { ACCOUNT_USE_CASE, AccountUseCase } from '@game/use-cases-contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(RehydrateQuery)
export class RehydrateHandler implements IQueryHandler<RehydrateQuery> {
  constructor(@Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase) {}

  async execute(query: RehydrateQuery) {
    const { user } = query;

    return { token: await this._accountUseCase.rehydrate(user) };
  }
}
