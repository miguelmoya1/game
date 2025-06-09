import { InjectionToken, Resource } from '@angular/core';
import { TranslateServiceImpl } from './translate.service';

export interface TranslateService {
  translates: Resource<Record<string, string>>;
  setLanguage(language: string): void;
  instant(key: string): string;
}

export const TRANSLATE_SERVICE = new InjectionToken<TranslateService>(
  'TRANSLATE_SERVICE',
  {
    providedIn: 'root',
    factory: () => new TranslateServiceImpl(),
  },
);
