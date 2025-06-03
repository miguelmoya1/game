import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DB_REF } from '@game/core';
import { firstValueFrom, map } from 'rxjs';
import { ItemEntity } from '../entities/item.entity';
import { mapItemArrayToEntityArray } from '../services/mappers/item.mapper';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemApiService } from './item-api.service.contract';

@Injectable()
export class ItemApiServiceImpl implements ItemApiService {
  readonly #httpClient = inject(HttpClient);
  readonly db = inject(DB_REF);

  async all() {
    const itemsDb = (await this.db.items.toArray()) as ItemEntity[];

    if (itemsDb.length > 0) {
      return itemsDb;
    }

    const items = await firstValueFrom(
      this.#httpClient
        .get<ItemEntity[]>('items')
        .pipe(map(mapItemArrayToEntityArray)),
    );

    await this.db.items.bulkPut(items);

    return items;
  }

  async create(createItemDto: CreateItemDto) {
    return firstValueFrom(this.#httpClient.post<void>('items', createItemDto));
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return firstValueFrom(
      this.#httpClient.put<void>(`items/${id}`, updateItemDto),
    );
  }

  async delete(id: string) {
    return firstValueFrom(this.#httpClient.delete<void>(`items/${id}`));
  }
}
