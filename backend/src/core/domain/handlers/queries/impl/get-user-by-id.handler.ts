import { GetUserByIdQuery } from '@game/queries';
import { USER_USE_CASE, UserUseCase } from '@game/use-cases-contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(@Inject(USER_USE_CASE) private readonly _userUseCase: UserUseCase) {}

  async execute(query: GetUserByIdQuery) {
    const { userId } = query;

    return await this._userUseCase.getById(userId);
  }
}
