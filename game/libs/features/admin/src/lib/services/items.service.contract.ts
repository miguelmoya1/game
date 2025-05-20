import { InjectionToken, Resource, WritableSignal } from '@angular/core';
import { ItemEntity } from '@game/core';
import { CreateItemDto } from '../data-access/dto/create-item.dto';
import { UpdateItemDto } from '../data-access/dto/update-item.dto';

export type ItemsService = {
  readonly currentItemId: WritableSignal<string | null>;
  readonly itemResource: Resource<ItemEntity | undefined>;

  create(createSetDto: CreateItemDto): Promise<void>;
  update(id: string, createSetDto: UpdateItemDto): Promise<void>;
  delete(id: string): Promise<void>;
};

export const ITEMS_SERVICE = new InjectionToken<ItemsService>('ITEMS_SERVICE');
