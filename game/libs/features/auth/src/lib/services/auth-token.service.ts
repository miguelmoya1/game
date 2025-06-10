import { computed, Injectable, Signal, signal } from '@angular/core';
import { AuthTokenService } from './auth-token.service.contract';

const TOKEN_KEY = 'token-key';

@Injectable()
export class AuthTokenServiceImpl implements AuthTokenService {
  readonly #token = signal<string | null>(null);

  public readonly token = this.#token.asReadonly() as Signal<string>;

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      this.#token.set(token);
    }
  }

  public readonly hasToken = computed(() => this.#token() !== null);

  public setToken(value: string) {
    this.#token.set(value);

    localStorage.setItem(TOKEN_KEY, value ?? '');
  }

  public removeToken() {
    this.#token.set(null);

    localStorage.removeItem(TOKEN_KEY);
  }
}
