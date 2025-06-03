import { inject, Injectable, resource } from '@angular/core';
import { CreateItemDto } from '../data-access/dto/create-item.dto';
import { UpdateItemDto } from '../data-access/dto/update-item.dto';
import { ITEM_API_SERVICE } from '../data-access/item-api.service.contract';
import { ItemsService } from './items.service.contract';
import { mapItemArrayToEntityArray } from './mappers/item.mapper';

@Injectable()
export class ItemsServiceImpl implements ItemsService {
  readonly #itemApiService = inject(ITEM_API_SERVICE);

  readonly #all = resource({
    loader: () => this.#itemApiService.all().then(mapItemArrayToEntityArray),
    defaultValue: [],
  });

  public readonly all = this.#all.asReadonly();

  public async create(createItemDto: CreateItemDto) {
    await this.#itemApiService.create(createItemDto);
  }

  public async update(id: string, updateItemDto: UpdateItemDto) {
    await this.#itemApiService.update(id, updateItemDto);
  }

  public async delete(id: string) {
    await this.#itemApiService.delete(id);
  }
}
