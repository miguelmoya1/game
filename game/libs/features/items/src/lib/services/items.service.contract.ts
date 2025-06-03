import { InjectionToken, Resource } from '@angular/core';
import { CreateItemDto } from '../data-access/dto/create-item.dto';
import { UpdateItemDto } from '../data-access/dto/update-item.dto';
import { ItemEntity } from '../entities/item.entity';
import { ItemsServiceImpl } from './items.service';

export interface ItemsService {
  readonly all: Resource<ItemEntity[]>;

  create(createItemsDto: CreateItemDto): Promise<void>;
  update(id: string, updateItemsDto: UpdateItemDto): Promise<void>;
  delete(id: string): Promise<void>;
}

export const ITEMS_SERVICE = new InjectionToken<ItemsService>('ITEMS_SERVICE', {
  providedIn: 'root',
  factory: () => new ItemsServiceImpl(),
});
