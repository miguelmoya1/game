import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { ListResponseDto } from '../../common/list-response.dto';
import { GetSetListQuery } from '../impl/get-set-list.query';

@QueryHandler(GetSetListQuery)
export class GetSetListHandler implements IQueryHandler<GetSetListQuery> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
  ) {}

  async execute(query: GetSetListQuery) {
    const { user } = query;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const sets = await this._setRepository.getAll();

    if (!sets) {
      throw new HttpException(ErrorCodes.SET_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return sets.map((set) => ListResponseDto.create(set));
  }
}
