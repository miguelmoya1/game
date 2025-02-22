import { InjectionToken } from '@angular/core';

export interface TranslateRepository {
  getTranslation(): Promise<{ [key: string]: string }>;
}

export const TRANSLATE_REPOSITORY = new InjectionToken<TranslateRepository>(
  'TRANSLATE_REPOSITORY'
);
