import { Account } from '../../domain/entities/account.entity.ts';
import type { AccountRepository } from '../../domain/interfaces/account.repository.ts';
import type { CreateAccountDto } from '../data/dtos/auth/create-account.dto.ts';

export class AccountRepositoryMock implements AccountRepository {
  async create(registerDto: CreateAccountDto, params: { readonly userId: string; readonly isPrimary?: boolean }) {
    return new Account({
      id: '1',
      userId: params.userId,
      provider: registerDto.provider,
      email: registerDto.email,
      providerId: registerDto.providerId,
      password: registerDto.password,
    } as any);
  }

  async getOneByProviderEmail(email: string) {
    return new Account({ id: '1', userId: '1', provider: 'EMAIL', email } as any);
  }

  async getById(accountId: string) {
    return new Account({ id: accountId, userId: '1', provider: 'EMAIL' } as any);
  }

  async confirm(accountId: string) {
    return new Account({ id: accountId, userId: '1', provider: 'EMAIL', isConfirmed: true } as any);
  }

  async forgotPassword(email: string, hash: string) {
    return new Account({ id: '1', userId: '1', provider: 'EMAIL', email, hashForPasswordReset: hash } as any);
  }

  async changePassword(accountId: string, password: string) {
    return new Account({ id: accountId, userId: '1', provider: 'EMAIL', password } as any);
  }

  async findByHash(hashForPasswordReset: string) {
    return new Account({
      id: '1',
      userId: '1',
      provider: 'EMAIL',
      hashForPasswordReset,
      hashExpiredAt: new Date(Date.now() + 1000),
    } as any);
  }

  async findById(id: string) {
    return new Account({ id, userId: '1', provider: 'EMAIL' } as any);
  }
}
