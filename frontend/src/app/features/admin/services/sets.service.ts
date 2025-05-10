import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateSetDto } from '../data-access/dto/create-set.dto';
import { SET_API_SERVICE } from '../data-access/set-api.service.contract';
import { mapSetListArrayToEntityArray } from './mappers/set.mapper';
import { SetsService } from './sets.service.contract';

@Injectable()
export class SetsServiceImpl implements SetsService {
  readonly #setApiService = inject(SET_API_SERVICE);
  readonly #setsResource = httpResource('sets/list', {
    defaultValue: [],
    parse: mapSetListArrayToEntityArray,
  });

  public readonly list = this.#setsResource.asReadonly();

  public async create(createSetDto: CreateSetDto) {
    await this.#setApiService.create(createSetDto);

    this.#setsResource.reload();
  }
}
