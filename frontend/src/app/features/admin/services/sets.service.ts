import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { mapSetToEntity } from '../../../shared/mappers/set.mapper';
import { CreateSetDto } from '../data-access/dto/create-set.dto';
import { SET_API_SERVICE } from '../data-access/set-api.service.contract';
import { mapSetListArrayToEntityArray } from './mappers/set-list.mapper';
import { SetsService } from './sets.service.contract';

@Injectable()
export class SetsServiceImpl implements SetsService {
  readonly #setApiService = inject(SET_API_SERVICE);
  readonly currentSetId = signal<string | null>(null);

  readonly #setsResource = httpResource('sets/list', {
    defaultValue: [],
    parse: mapSetListArrayToEntityArray,
  });

  public readonly list = this.#setsResource.asReadonly();

  readonly #currentSet = httpResource(() => (this.currentSetId() ? `sets/${this.currentSetId()}` : undefined), {
    defaultValue: undefined,
    parse: mapSetToEntity,
  });

  public readonly currentSetResource = this.#currentSet.asReadonly();

  public async create(createSetDto: CreateSetDto) {
    await this.#setApiService.create(createSetDto);
  }

  public async update(id: string, updateSetDto: CreateSetDto) {
    await this.#setApiService.update(id, updateSetDto);
  }

  public async delete(id: string) {
    await this.#setApiService.delete(id);
  }
}
