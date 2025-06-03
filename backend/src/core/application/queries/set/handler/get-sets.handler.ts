import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { SetResponseDto } from '../dto/set-response.dto';
import { GetSetsQuery } from '../impl/get-sets.query';

@QueryHandler(GetSetsQuery)
export class GetSetsHandler implements IQueryHandler<GetSetsQuery> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
  ) {}

  async execute(query: GetSetsQuery) {
    const { user } = query;

    if (!user) {
      throw new HttpException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const sets = await this._setRepository.getAll();

    if (!sets) {
      throw new HttpException(ErrorCodes.SETS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return sets.map((set) => SetResponseDto.create(set));
  }
}
