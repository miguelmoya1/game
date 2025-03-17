import { inject } from '../../../../di/di-manager.ts';
import { USER_USE_CASE } from '../../use-cases/user.use-case.contract.ts';

export interface GetUserByIdQueryParams {
  userId: string;
}

export class GetUserByIdQuery {
  readonly #userUseCase = inject(USER_USE_CASE);

  async execute(query: GetUserByIdQueryParams) {
    return await this.#userUseCase.getById(query.userId);
  }
}
