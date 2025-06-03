import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { AuthApiService } from './auth-api.service.contract';
import { LoginEmailDto } from './dto/login-email.dto';
import { RegisterDto } from './dto/register.dto';
import { tokenMapper } from './mappers/auth.mapper';

@Injectable()
export class AuthApiServiceImpl implements AuthApiService {
  readonly #httpClient = inject(HttpClient);

  async loginEmail(loginEmailDto: LoginEmailDto) {
    return await firstValueFrom(
      this.#httpClient
        .post<{ token: string }>('auth/login/email', loginEmailDto)
        .pipe(map(tokenMapper)),
    );
  }

  async register(registerDto: RegisterDto) {
    return await firstValueFrom(
      this.#httpClient.post<void>('auth/register', registerDto),
    );
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const result = await firstValueFrom(
      this.#httpClient.post<{ exists: boolean }>('auth/check-email', { email }),
    );
    return result.exists;
  }
}
