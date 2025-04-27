import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities';
import { ErrorCodes } from '../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from '../../../infrastructure/repositories';
import {
  PERMISSIONS_SERVICE,
  PermissionsService,
} from '../../services/permissions/permissions.service.contract';
import { ItemUseCase } from '../contracts/item.use-case.contract';
import { ItemResponseDto } from '../dtos/item-response.dto';

@Injectable()
export class ItemUseCaseImpl implements ItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async getById(itemId: string, user: UserEntity) {
    const item = await this._itemRepository.findById(itemId);

    if (!item) {
      throw new Error(ErrorCodes.ITEM_NOT_FOUND);
    }

    const permissions = this._permissionsService.getItemPermissions(user);

    return ItemResponseDto.create(item, permissions);
  }
}
