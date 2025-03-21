import { Account } from '../../../domain/entities/account.entity.ts';
import { User } from '../../../domain/entities/user.entity.ts';
import type { AccountUseCase } from '../../../domain/use-cases/account.use-case.contract.ts';
import { CreateAccountDto } from '../../../infrastructure/data/dtos/auth/create-account.dto.ts';
import { CreateUserDto } from '../../../infrastructure/data/dtos/user/create-user.dto.ts';

export class AccountUseCaseMock implements AccountUseCase {
  async signInWithEmail(email: string, password: string) {
    return new User({ id: '1', name: 'Mock User' } as any);
  }

  async create(createUserDto: CreateUserDto, createAccountDto: CreateAccountDto): Promise<User> {
    return new User({ id: '1', name: createUserDto.name } as any);
  }

  async getById(id: string): Promise<Account> {
    return new Account({ id, userId: '1', provider: 'email' } as any);
  }

  async confirm(accountId: string): Promise<User> {
    return new User({ id: '1', name: 'Confirmed User' } as any);
  }

  async forgotPassword(email: string): Promise<Account> {
    return new Account({ id: '1', userId: '1', provider: 'email' } as any);
  }

  async changePassword(hashForPasswordReset: string, password: string): Promise<boolean> {
    return true;
  }
}
