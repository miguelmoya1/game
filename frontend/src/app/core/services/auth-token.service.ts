import { Injectable, Signal, signal } from '@angular/core';

const TOKEN_KEY = 'token-key';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  readonly #token = signal<string | null>(null);

  public readonly token = this.#token.asReadonly() as Signal<string>;

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      this.#token.set(token);
    }
  }

  public setToken(value: string) {
    this.#token.set(value);

    localStorage.setItem(TOKEN_KEY, value ?? '');
  }

  public hasToken() {
    return this.#token() !== null;
  }

  public removeToken() {
    this.#token.set(null);

    localStorage.removeItem(TOKEN_KEY);
  }
}
