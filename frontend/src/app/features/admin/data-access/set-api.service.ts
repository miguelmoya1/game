import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreateSetDto } from './dto/create-set.dto';
import { SetApiService } from './set-api.service.contract';

@Injectable()
export class SetApiServiceImpl implements SetApiService {
  readonly #httpClient = inject(HttpClient);

  async create(createSetDto: CreateSetDto) {
    return firstValueFrom(this.#httpClient.post<void>('sets', createSetDto));
  }
}
