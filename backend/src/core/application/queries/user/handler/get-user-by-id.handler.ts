import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import { USER_REPOSITORY, UserRepository } from '../../../../infrastructure/repositories';
import { UserResponseDto } from '../dto/user-response.dto';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly _userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery) {
    const { userId } = query;

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new HttpException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return UserResponseDto.create(user);
  }
}
