import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemApiService } from './item-api.service.contract';

@Injectable()
export class ItemApiServiceImpl implements ItemApiService {
  readonly #httpClient = inject(HttpClient);

  async create(createItemDto: CreateItemDto) {
    return firstValueFrom(this.#httpClient.post<void>('items', createItemDto));
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return firstValueFrom(this.#httpClient.put<void>(`items/${id}`, updateItemDto));
  }
}
