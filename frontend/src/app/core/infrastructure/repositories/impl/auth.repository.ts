import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { isAuthenticatedMapper, tokenMapper } from '@game/mappers';
import { firstValueFrom } from 'rxjs';
import { AuthRepository } from '../contracts/auth.repository.contract';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  readonly #httpClient = inject(HttpClient);

  readonly isAuthenticated = httpResource('auth/is-authenticated', {
    defaultValue: false,
    parse: isAuthenticatedMapper,
  });

  public async login(email: string, password: string) {
    const tokenResponse = await firstValueFrom(this.#httpClient.post('auth/login/email', { email, password }));

    return tokenMapper(tokenResponse);
  }

  public async rehydrate() {
    const tokenRehydrate = await firstValueFrom(this.#httpClient.get('auth/rehydrate'));

    return tokenMapper(tokenRehydrate);
  }
}
