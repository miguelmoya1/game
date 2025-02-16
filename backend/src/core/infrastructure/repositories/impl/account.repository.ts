import { CreateAccountDto } from '@game/data/dto';
// import { PrismaService } from '@game/database';
import { Injectable } from '@nestjs/common';
// import { Provider } from '@prisma/client';

type CreateParams = {
  readonly userId: string;
  readonly isPrimary?: boolean;
};

@Injectable()
//  implements AccountRepository
export class AccountRepositoryImpl {
  // constructor(private readonly _prisma: PrismaService) {}

  findByHash(hashForPasswordReset: string) {
    // return this._prisma.account.findFirst({
    //   where: {
    //     hashForPasswordReset,
    //   },
    // });
  }

  public async changePassword(accountId: string, password: string) {
    // const updated = await this._prisma.account.update({
    //   where: {
    //     id: accountId,
    //   },
    //   data: {
    //     password,
    //     hashForPasswordReset: null,
    //     hashExpiredAt: null,
    //   },
    // });
    // if (!updated) {
    //   return null;
    // }
    // return accountToEntity(updated);
  }

  public async forgotPassword(email: string, hash: string) {
    // const res = await this._prisma.account.update({
    //   where: {
    //     email,
    //   },
    //   data: {
    //     hashForPasswordReset: hash,
    //     hashExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    //   },
    // });
    // if (!res) {
    //   return null;
    // }
    // return accountToEntity(res);
  }

  public async confirm(accountId: string) {
    // const account = await this._prisma.account.findUnique({
    //   where: {
    //     id: accountId,
    //   },
    // });
    // if (!account) {
    //   return null;
    // }
    // const updated = await this._prisma.account.update({
    //   where: {
    //     id: accountId,
    //   },
    //   data: {
    //     isConfirmed: true,
    //   },
    // });
    // if (!updated) {
    //   return null;
    // }
    // return accountToEntity(updated);
  }

  public async getById(accountId: string) {
    // const account = await this._prisma.account.findFirst({
    //   where: {
    //     OR: [
    //       {
    //         id: accountId,
    //       },
    //     ],
    //   },
    // });
    // if (!account) {
    //   return null;
    // }
    // return accountToEntity(account);
  }

  public async create(createAccountDto: CreateAccountDto, params: CreateParams) {
    // const { userId, isPrimary } = params;
    // const { email, provider, providerId, password } = createAccountDto;
    // const account = await this._prisma.account.create({
    //   data: {
    //     email,
    //     provider,
    //     providerId,
    //     password,
    //     userId,
    //     isPrimary,
    //   },
    // });
    // if (!account) {
    //   return null;
    // }
    // return accountToEntity(account);
  }

  public async getOneByProviderEmail(email: string) {
    // const res = await this._prisma.account.findFirst({
    //   where: {
    //     provider: Provider.EMAIL,
    //     email,
    //   },
    // });
    // if (!res) {
    //   return null;
    // }
    // return accountToEntity(res);
  }
}
