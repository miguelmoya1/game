import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { isAuthenticatedMapper, tokenMapper } from '@game/mappers';
import { firstValueFrom, map } from 'rxjs';
import { AuthRepository } from '../contracts/auth.repository.contract';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  readonly #httpClient = inject(HttpClient);

  readonly isAuthenticated = httpResource('auth/is-authenticated', {
    defaultValue: false,
    parse: isAuthenticatedMapper,
  });

  public async login(email: string, password: string) {
    return await firstValueFrom(this.#httpClient.post('auth/login/email', { email, password }).pipe(map(tokenMapper)));
  }

  public async rehydrate() {
    return await firstValueFrom(this.#httpClient.get('auth/rehydrate').pipe(map(tokenMapper)));
  }
}
