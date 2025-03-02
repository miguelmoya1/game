import { inject, Injectable } from '@angular/core';
import { AUTH_REPOSITORY } from '@game/interfaces';
import { AuthUseCase } from '@game/use-cases-contracts';

@Injectable()
export class AuthUseCaseImpl implements AuthUseCase {
  readonly #authRepository = inject(AUTH_REPOSITORY);

  readonly #isAuthenticated = this.#authRepository.isAuthenticated;

  get isAuthenticated() {
    return this.#isAuthenticated;
  }

  constructor() {
    const token = localStorage.getItem('auth-token');

    if (token) {
      this.#rehydrate();
    }
  }

  public logout() {
    localStorage.removeItem('auth-token');
    this.#isAuthenticated.set(false);
  }

  public async login(email: string, password: string) {
    const token = await this.#authRepository.login(email, password);

    if (!token) {
      return false;
    }

    localStorage.setItem('auth-token', token);

    this.#isAuthenticated.set(true);

    return true;
  }

  async #rehydrate() {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return false;
    }

    const newToken = await this.#authRepository.rehydrate();

    if (!newToken) {
      this.logout();

      return false;
    }

    localStorage.setItem('auth-token', newToken);

    this.#isAuthenticated.set(true);

    return true;
  }
}
