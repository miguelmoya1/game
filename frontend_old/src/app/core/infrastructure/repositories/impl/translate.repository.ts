import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateRepository } from '../contracts/translate.repository.contract';

@Injectable()
export class TranslateRepositoryImpl implements TranslateRepository {
  readonly #httpClient = inject(HttpClient);

  public async getTranslation() {
    return firstValueFrom(this.#httpClient.get<{ [key: string]: string }>(`translate`));
  }
}
