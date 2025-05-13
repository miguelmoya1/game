import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { SetResponseDto } from '../dto/set-response.dto';
import { GetSetByIdQuery } from '../impl/get-set-by-id.query';

@QueryHandler(GetSetByIdQuery)
export class GetSetByIdHandler implements IQueryHandler<GetSetByIdQuery> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
  ) {}

  async execute(query: GetSetByIdQuery) {
    const { user, setId } = query;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const set = await this._setRepository.getById(setId);

    if (!set) {
      throw new HttpException(ErrorCodes.SET_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return SetResponseDto.create(set);
  }
}
