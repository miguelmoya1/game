import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DB_REF } from '@game/shared';
import { firstValueFrom, map } from 'rxjs';
import { SetEntity } from '../entities/set.entity';
import { mapSetArrayToEntityArray } from '../mappers/set.mapper';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { SetApiService } from './set-api.service.contract';

@Injectable()
export class SetApiServiceImpl implements SetApiService {
  readonly #httpClient = inject(HttpClient);
  readonly db = inject(DB_REF);

  async all() {
    const setsDb = (await this.db.sets.toArray()) as SetEntity[];

    if (setsDb.length > 0) {
      return setsDb;
    }

    const sets = await firstValueFrom(
      this.#httpClient
        .get<SetEntity[]>('sets')
        .pipe(map(mapSetArrayToEntityArray)),
    );

    await this.db.sets.bulkPut(sets);

    return sets;
  }

  async create(createSetDto: CreateSetDto) {
    return firstValueFrom(this.#httpClient.post<void>('sets', createSetDto));
  }

  async update(id: string, updateSetDto: UpdateSetDto) {
    return firstValueFrom(
      this.#httpClient.put<void>(`sets/${id}`, updateSetDto),
    );
  }

  async delete(id: string) {
    return firstValueFrom(this.#httpClient.delete<void>(`sets/${id}`));
  }
}
