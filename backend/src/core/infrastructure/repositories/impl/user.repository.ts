import { Inject, Injectable } from '@nestjs/common';
import { AccountProvider, UserRole } from '@prisma/client';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import {
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../../application/services/encryption/encryption.service.contract';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { userToEntity } from '../../mappers';
import { UserRepository } from '../contracts/user.repository.contract';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,

    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
  ) {
    this.#init();
  }

  public async create(createUSerDto: CreateUserDto) {
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
    const user = await this._database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return userToEntity(user);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
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
