import { HttpClient, HttpEventType, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { isAuthenticatedMapper, tokenMapper } from '@game/mappers';
import { filter, firstValueFrom, map } from 'rxjs';
import { AuthRepository } from '../contracts/auth.repository.contract';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  readonly #httpClient = inject(HttpClient);

  readonly isAuthenticated = httpResource(() => 'auth/is-authenticated', {
    defaultValue: false,
    parse: isAuthenticatedMapper,
  });

  public async login(email: string, password: string) {
    return firstValueFrom(
      this.#httpClient.post<void>('auth/login/email', { email, password }, { observe: 'events' }).pipe(
        filter((event) => event.type === HttpEventType.Response),
        map((event) => event.headers.get('authorization')),
        map((token) => token?.replace('Bearer ', '')),
      ),
    );
  }

  public async rehydrate() {
    return firstValueFrom(this.#httpClient.get<{ token: string }>('auth/rehydrate').pipe(map(tokenMapper)));
  }
}
