import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { mapSearchResponseToEntity } from './mappers/search.mapper';
import { SearchService } from './search.service.contract';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceImpl implements SearchService {
  readonly search = signal('');

  readonly #searchResource = httpResource(
    () => (this.hasEnoughCharacters() ? `search?${new URLSearchParams({ criteria: this.search() })}` : undefined),
    {
      defaultValue: undefined,
      parse: mapSearchResponseToEntity,
    },
  );

  readonly searchList = this.#searchResource.asReadonly();
  readonly hasEnoughCharacters = computed(() => this.search().length >= 3);
}
