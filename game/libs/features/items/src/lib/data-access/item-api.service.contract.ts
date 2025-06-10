import { InjectionToken } from '@angular/core';
import { ItemEntity } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemApiServiceImpl } from './item-api.service';

export type ItemApiService = {
  all(): Promise<ItemEntity[]>;

  create(createItemDto: CreateItemDto): Promise<void>;
  update(id: string, updateItemDto: UpdateItemDto): Promise<void>;
  delete(id: string): Promise<void>;
};

export const ITEM_API_SERVICE = new InjectionToken<ItemApiService>(
  'ITEM_API_SERVICE',
  {
    factory: () => new ItemApiServiceImpl(),
  },
);
