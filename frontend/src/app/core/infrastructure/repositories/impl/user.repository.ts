import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto } from '@game/dto';
import { UserRepository } from '@game/interfaces';
import { mapUserToEntity } from '@game/mappers';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  readonly #httpClient = inject(HttpClient);

  public async getLogged() {
    return firstValueFrom(this.#httpClient.get<UserDto>('users/me').pipe(map(mapUserToEntity)));
  }
}
