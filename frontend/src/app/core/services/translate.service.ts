import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  readonly #currentLanguage = signal('en');

  readonly translates = httpResource(() => `translate/${this.#currentLanguage()}`, {
    defaultValue: {} as Record<string, string>,
    parse: (response: unknown) => {
      return response as Record<string, string>;
    },
  });

  public setLanguage(language: string) {
    this.#currentLanguage.set(language);
  }

  public instant(key: string) {
    return this.translates.value()[key] ?? key;
  }
}
