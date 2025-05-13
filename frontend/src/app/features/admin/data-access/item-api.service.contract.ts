import { InjectionToken } from '@angular/core';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export type ItemApiService = {
  create(createItemDto: CreateItemDto): Promise<void>;
  update(id: string, updateItemDto: UpdateItemDto): Promise<void>;
};

export const ITEM_API_SERVICE = new InjectionToken<ItemApiService>('ITEM_API_SERVICE');
