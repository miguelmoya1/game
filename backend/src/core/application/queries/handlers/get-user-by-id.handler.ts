import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  USER_USE_CASE,
  UserUseCase,
} from '../../use-cases/contracts/user.use-case.contract';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_USE_CASE) private readonly _userUseCase: UserUseCase,
  ) {}

  async execute(query: GetUserByIdQuery) {
    const { userId } = query;

    return await this._userUseCase.getById(userId);
  }
}
