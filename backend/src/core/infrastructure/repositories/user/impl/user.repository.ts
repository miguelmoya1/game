import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDataDto,
  UpdateUserDataDto,
} from '../../../../application/commands';
import {
  DATABASE_SERVICE,
  DatabaseService,
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../../../application/services';
import { AccountProvider, UserRole } from '../../../../domain/enums';
import { UserRepository } from '../contracts/user.repository.contract';
import { userToEntity } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,

    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
  ) {
    void this.#init();
  }

  public async create(createUSerDto: CreateUserDataDto) {
    const user = await this._database.user.create({
      data: {
        name: createUSerDto.name,
        role: UserRole.USER,
        surname: createUSerDto.surname,
      },
    });

    if (!user) {
      return null;
    }

    return userToEntity(user);
  }

  public async findById(id: string) {
    const now = new Date();
    const user = await this._database.user.findFirst({
      where: {
        id,
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
    });

    if (!user) {
      return null;
    }

    return userToEntity(user);
  }

  public async update(id: string, updateUserDto: UpdateUserDataDto) {
    const updatedUser = await this._database.user.update({
      where: { id },
      data: {
        nickname: updateUserDto.nickname,
      },
    });

    if (updatedUser) {
      return userToEntity(updatedUser);
    }

    return null;
  }

  async delete(id: string) {
    await this._database.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async #init() {
    const usersTotal = await this._database.user.count();

    if (usersTotal === 0) {
      const user = await this._database.user.create({
        data: {
          name: 'Admin',
          surname: 'Admin',
          nickname: 'Miguelmo',
          role: UserRole.ADMIN,
        },
      });

      if (!user) {
        throw new Error('Error creating admin user');
      }

      const account = await this._database.account.create({
        data: {
          provider: AccountProvider.EMAIL,
          userId: user.id,
          email: 'miguelmoyaortega@gmail.com',
          password: await this._encryptionService.encrypt('123456'),
          providerId: 'admin',
        },
      });

      if (!account) {
        throw new Error('Error creating admin account');
      }
    }
  }
}
