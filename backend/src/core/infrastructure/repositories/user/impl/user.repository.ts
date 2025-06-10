import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDataDto } from '../../../../application/commands';
import { DATABASE_SERVICE, DatabaseService } from '../../../../application/services';
import { UserRole } from '../../../../domain/enums';
import { UserRepository } from '../contracts/user.repository.contract';
import { userToEntity } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@Inject(DATABASE_SERVICE) private readonly _database: DatabaseService) {}

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

  async delete(id: string) {
    await this._database.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
