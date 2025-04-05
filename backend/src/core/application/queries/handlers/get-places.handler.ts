import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PLACE_USE_CASE, PlaceUseCase } from '../../use-cases';
import { GetPlacesQuery } from '../impl/get-places.query';

@QueryHandler(GetPlacesQuery)
export class GetPlacesHandler implements IQueryHandler<GetPlacesQuery> {
  constructor(
    @Inject(PLACE_USE_CASE) private readonly _placeUseCase: PlaceUseCase,
  ) {}

  async execute(query: GetPlacesQuery) {
    const { lat, lng } = query;

    return await this._placeUseCase.getAll(lat, lng);
  }
}
