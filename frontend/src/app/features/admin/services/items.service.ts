import { inject, Injectable } from '@angular/core';
import { CreateItemDto } from '../data-access/dto/create-item.dto';
import { ITEM_API_SERVICE } from '../data-access/item-api.service.contract';
import { ItemsService } from './items.service.contract';

@Injectable()
export class ItemsServiceImpl implements ItemsService {
  readonly #itemApiService = inject(ITEM_API_SERVICE);

  public async create(createItemDto: CreateItemDto) {
    await this.#itemApiService.create(createItemDto);
  }
}
