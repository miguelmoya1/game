import { Inject, Injectable } from '@nestjs/common';
import { ErrorCodes } from '../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from '../../../infrastructure/repositories';
import { ItemUseCase } from '../contracts/item.use-case.contract';

@Injectable()
export class ItemUseCaseImpl implements ItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
  ) {}

  async getById(itemId: string) {
    const item = await this._itemRepository.findById(itemId);

    if (!item) {
      throw new Error(ErrorCodes.ITEM_NOT_FOUND);
    }

    return item;
  }
}
