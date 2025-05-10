import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
  PLACE_REPOSITORY,
  PlaceRepository,
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { SearchResponseDto } from '../dto/search-response.dto';
import { SearchQuery } from '../impl/search.query';

@QueryHandler(SearchQuery)
export class SearchHandler implements IQueryHandler<SearchQuery> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
  ) {}

  async execute(query: SearchQuery) {
    const { user, criteria } = query;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const sets = await this._setRepository.search(criteria);
    const places = await this._placeRepository.search(criteria);
    const items = await this._itemRepository.search(criteria);

    return {
      sets: sets.map((set) => SearchResponseDto.create(set)),
      places: places.map((place) => SearchResponseDto.create(place)),
      items: items.map((item) => SearchResponseDto.create(item)),
    };
  }
}
