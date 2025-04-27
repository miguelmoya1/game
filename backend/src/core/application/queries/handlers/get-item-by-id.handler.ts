import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITEM_USE_CASE, ItemUseCase } from '../../use-cases';
import { GetItemByIdQuery } from '../impl/get-item-by-id.query';

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdHandler implements IQueryHandler<GetItemByIdQuery> {
  constructor(
    @Inject(ITEM_USE_CASE) private readonly _placeUseCase: ItemUseCase,
  ) {}

  async execute(query: GetItemByIdQuery) {
    const { itemId, user } = query;

    return await this._placeUseCase.getById(itemId, user);
  }
}
