import { InjectionToken } from '@angular/core';
import { CreateItemDto } from './dto/create-item.dto';

export type ItemApiService = {
  create(createItemDto: CreateItemDto): Promise<void>;
};

export const ITEM_API_SERVICE = new InjectionToken<ItemApiService>('ITEM_API_SERVICE');
