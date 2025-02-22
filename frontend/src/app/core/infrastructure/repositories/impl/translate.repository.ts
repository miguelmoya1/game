import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateRepository } from '@game/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TranslateRepositoryImpl implements TranslateRepository {
  readonly #httpClient = inject(HttpClient);

  public async getTranslation() {
    return firstValueFrom(this.#httpClient.get<{ [key: string]: string }>(`translate`));
  }
}
