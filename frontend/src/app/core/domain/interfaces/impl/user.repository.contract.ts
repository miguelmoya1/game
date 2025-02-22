import { InjectionToken } from '@angular/core';
import { User } from '@game/entities';

export interface UserRepository {
  getLogged(): Promise<User>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');
