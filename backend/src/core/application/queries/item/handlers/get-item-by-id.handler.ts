import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from '../../../../infrastructure/repositories';
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { ItemResponseDto } from '../dto/item-response.dto';
import { GetItemByIdQuery } from '../impl/get-item-by-id.query';

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdHandler implements IQueryHandler<GetItemByIdQuery> {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async execute(query: GetItemByIdQuery) {
    const { itemId, user } = query;

    const item = await this._itemRepository.findById(itemId);

    if (!item) {
      throw new Error(ErrorCodes.ITEM_NOT_FOUND);
    }

    const permissions = this._permissionsService.getItemPermissions(user);

    return ItemResponseDto.create(item, permissions);
  }
}
