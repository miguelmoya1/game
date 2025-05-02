import { Inject, Injectable } from '@nestjs/common';
import { AccountProvider } from '@prisma/client';
import { CreateAccountDataDto } from '../../../../application/commands/auth/dto/create-account-data.dto';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { AccountRepository } from '../contracts/account.repository.contract';
import { accountToEntity } from '../mappers/account.mapper';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,
  ) {}

  async findByHash(hashForPasswordReset: string) {
    const account = await this._database.account.findFirst({
      where: {
        hashForPasswordReset,
      },
    });

    if (!account) {
      return null;
    }

    return accountToEntity(account);
  }

  public async changePassword(accountId: string, password: string) {
    const updated = await this._database.account.update({
      where: {
        id: accountId,
      },
      data: {
        password,
        hashForPasswordReset: null,
        hashExpiredAt: null,
      },
    });

    if (!updated) {
      return null;
    }

    return accountToEntity(updated);
  }

  public async forgotPassword(email: string, hash: string) {
    const res = await this._database.account.update({
      where: {
        email,
      },
      data: {
        hashForPasswordReset: hash,
        hashExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
      },
    });

    if (!res) {
      return null;
    }

    return accountToEntity(res);
  }

  public async active(accountId: string) {
    try {
      const account = await this._database.account.findUnique({
        where: {
          id: accountId,
        },
      });

      if (!account) {
        return null;
      }

      const updated = await this._database.account.update({
        where: {
          id: accountId,
        },
        data: {
          isConfirmed: true,
        },
      });

      if (!updated) {
        return null;
      }

      return accountToEntity(updated);
    } catch (error) {
      console.error('Error activating account:', error);
      return null;
    }
  }

  public async getById(accountId: string) {
    const account = await this._database.account.findFirst({
      where: {
        OR: [
          {
            id: accountId,
          },
        ],
      },
    });

    if (!account) {
      return null;
    }

    return accountToEntity(account);
  }

  public async create(createAccountDto: CreateAccountDataDto) {
    const { email, provider, providerId, password, userId, isPrimary } =
      createAccountDto;

    const account = await this._database.account.create({
      data: {
        email,
        provider,
        providerId,
        password,
        userId,
        isPrimary,
      },
    });

    if (!account) {
      return null;
    }

    return accountToEntity(account);
  }

  public async getOneByProviderEmail(email: string) {
    const res = await this._database.account.findFirst({
      where: {
        provider: AccountProvider.EMAIL,
        email,
      },
    });

    if (!res) {
      return null;
    }

    return accountToEntity(res);
  }
}
