import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
import { RehydrateQuery } from '../impl/rehydrate.query';

@QueryHandler(RehydrateQuery)
export class RehydrateHandler implements IQueryHandler<RehydrateQuery> {
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(query: RehydrateQuery) {
    const { user } = query;

    return { token: await this._accountUseCase.rehydrate(user) };
  }
}
