import { User } from '../../domain/entities/user.entity.ts';
import type { UserRepository } from '../../domain/interfaces/user.repository.ts';
import type { CreateUserDto } from '../data/dtos/user/create-user.dto.ts';
import type { UpdateUserDto } from '../data/dtos/user/update-user.dto.ts';

export class UserRepositoryMock implements UserRepository {
  findById(id: string): Promise<User | null> {
    return Promise.resolve(new User({} as any));
  }

  update(id: string, user: UpdateUserDto): Promise<User | null> {
    return Promise.resolve(new User({ id, ...user } as any));
  }

  create(createUserDto: CreateUserDto): Promise<User | null> {
    return Promise.resolve(new User({ ...createUserDto } as any));
  }
}
