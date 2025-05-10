import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { tokenMapper } from '../mappers/auth.mapper';
import { AuthApiService } from './auth-api.service.contract';
import { LoginEmailDto } from './dto/login-email.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthApiServiceImpl implements AuthApiService {
  readonly #httpClient = inject(HttpClient);

  async loginEmail(loginEmailDto: LoginEmailDto) {
    return await firstValueFrom(this.#httpClient.post('auth/login/email', loginEmailDto).pipe(map(tokenMapper)));
  }

  async register(registerDto: RegisterDto) {
    return await firstValueFrom(this.#httpClient.post('auth/register', registerDto).pipe(map(tokenMapper)));
  }
}
