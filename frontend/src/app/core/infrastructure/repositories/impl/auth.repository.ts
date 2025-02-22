import { HttpClient, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '@game/interfaces';
import { catchError, filter, firstValueFrom, map, of } from 'rxjs';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  readonly #httpClient = inject(HttpClient);

  public async isAuthenticated() {
    return firstValueFrom(
      this.#httpClient.get<{ isAuthenticated: boolean }>('auth/is-authenticated').pipe(
        catchError(() => of({ isAuthenticated: false })),
        map((res) => res.isAuthenticated),
      ),
    );
  }

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
    return firstValueFrom(this.#httpClient.get<{ token: string }>('auth/rehydrate').pipe(map((res) => res.token)));
  }
}
