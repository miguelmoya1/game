import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { mapItemToEntity } from '../../../shared/mappers/item.mapper';
import { CreateItemDto } from '../data-access/dto/create-item.dto';
import { UpdateItemDto } from '../data-access/dto/update-item.dto';
import { ITEM_API_SERVICE } from '../data-access/item-api.service.contract';
import { ItemsService } from './items.service.contract';

@Injectable()
export class ItemsServiceImpl implements ItemsService {
  readonly #itemApiService = inject(ITEM_API_SERVICE);
  readonly currentItemId = signal<string | null>(null);

  readonly #itemResource = httpResource(() => (this.currentItemId() ? `items/${this.currentItemId()}` : undefined), {
    defaultValue: undefined,
    parse: mapItemToEntity,
  });

  readonly itemResource = this.#itemResource.asReadonly();

  public async create(createItemDto: CreateItemDto) {
    await this.#itemApiService.create(createItemDto);
  }

  public async update(id: string, updateItemDto: UpdateItemDto) {
    await this.#itemApiService.update(id, updateItemDto);
  }
}
