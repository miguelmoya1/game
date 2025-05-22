import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from '../../../../infrastructure/repositories';
import { CheckEmailExistsQuery } from '../impl/check-email-exists.query';

@QueryHandler(CheckEmailExistsQuery)
export class CheckEmailExistsHandler
  implements IQueryHandler<CheckEmailExistsQuery>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
  ) {}

  async execute(query: CheckEmailExistsQuery) {
    const account = await this._accountRepository.getOneByProviderEmail(
      query.email,
    );
    return { exists: !!account };
  }
}
