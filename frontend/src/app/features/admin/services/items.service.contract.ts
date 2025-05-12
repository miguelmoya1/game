import { InjectionToken } from '@angular/core';
import { CreateItemDto } from '../data-access/dto/create-item.dto';

export type ItemsService = {
  create(createSetDto: CreateItemDto): Promise<void>;
};

export const ITEMS_SERVICE = new InjectionToken<ItemsService>('ITEMS_SERVICE');
