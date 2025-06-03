import { inject, Injectable, resource } from '@angular/core';
import { CreateSetDto } from '../data-access/dto/create-set.dto';
import { UpdateSetDto } from '../data-access/dto/update-set.dto';
import { SET_API_SERVICE } from '../data-access/set-api.service.contract';
import { mapSetArrayToEntityArray } from '../mappers/set.mapper';
import { SetService } from './set.service.contract';

@Injectable()
export class SetServiceImpl implements SetService {
  readonly #setApiService = inject(SET_API_SERVICE);

  readonly #all = resource({
    loader: () => this.#setApiService.all().then(mapSetArrayToEntityArray),
    defaultValue: [],
  });

  public readonly all = this.#all.asReadonly();

  public async create(createSetDto: CreateSetDto) {
    await this.#setApiService.create(createSetDto);
  }

  public async update(id: string, updateSetDto: UpdateSetDto) {
    await this.#setApiService.update(id, updateSetDto);
  }

  public async delete(id: string) {
    await this.#setApiService.delete(id);
  }
}
