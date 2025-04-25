import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PLACE_USE_CASE, PlaceUseCase } from '../../use-cases';
import { GetPlaceQuery } from '../impl/get-place.query';

@QueryHandler(GetPlaceQuery)
export class GetPlaceHandler implements IQueryHandler<GetPlaceQuery> {
  constructor(
    @Inject(PLACE_USE_CASE) private readonly _placeUseCase: PlaceUseCase,
  ) {}

  async execute(query: GetPlaceQuery) {
    const { id } = query;

    return await this._placeUseCase.getById(id);
  }
}
