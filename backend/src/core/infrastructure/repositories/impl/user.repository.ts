import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserRepository } from '..';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { userToEntity } from '../../mappers';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,
  ) {}

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
}
