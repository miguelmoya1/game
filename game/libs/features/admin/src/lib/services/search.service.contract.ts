import { InjectionToken, Resource, Signal, WritableSignal } from '@angular/core';
import { SearchResponseDto } from './dto/search.dto';

export type SearchService = {
  readonly search: WritableSignal<string>;
  readonly searchList: Resource<SearchResponseDto | undefined>;
  readonly hasEnoughCharacters: Signal<boolean>;
};

export const SEARCH_SERVICE = new InjectionToken<SearchService>('SEARCH_SERVICE');
