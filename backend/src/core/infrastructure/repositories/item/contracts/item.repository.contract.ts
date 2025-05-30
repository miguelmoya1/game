import { UpdateItemDataDto } from '../../../../../core/application/commands/item/dto/update-item-data.dto';
import { CreateItemDataDto } from '../../../../application/commands';
import { ItemEntity } from '../../../../domain/entities';

export interface ItemRepository {
  findAll(): Promise<ItemEntity[]>;
  findById(id: string): Promise<ItemEntity | null>;
  create(item: CreateItemDataDto): Promise<boolean>;
  update(id: string, updateItemDto: UpdateItemDataDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export const ITEM_REPOSITORY = Symbol('ITEM_REPOSITORY');
