import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import { ITEM_REPOSITORY, ItemRepository } from '../../../../infrastructure/repositories';
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { ItemResponseDto } from '../dto/item-response.dto';
import { GetItemsQuery } from '../impl/get-items.query';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async execute(query: GetItemsQuery) {
    const { user } = query;

    const items = await this._itemRepository.getAll();

    if (!items || items.length === 0) {
      throw new HttpException(ErrorCodes.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const permissions = this._permissionsService.getItemPermissions(user);

    return items.map((item) => ItemResponseDto.create(item, permissions));
  }
}
