import { CreateUserDto, UpdateUserDto } from '@game/data/dto';
// import { PrismaService } from '@game/database';
import { Injectable } from '@nestjs/common';

@Injectable()
// implements UserRepository
export class UserRepositoryImpl {
  // #prisma: PrismaService;

  // constructor(prisma: PrismaService) {
  //   this.#prisma = prisma;
  // }

  public async create(createUSerDto: CreateUserDto) {
    // const user = await this.#prisma.user.create({
    //   data: {
    //     name: createUSerDto.name,
    //     surname: createUSerDto.surname,
    //   },
    // });
    // if (!user) {
    //   return null;
    // }
    // return userToEntity(user);
  }

  public async findById(id: string) {
    // const user = await this.#prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    // });
    // if (!user) {
    //   return null;
    // }
    // return userToEntity(user);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    // const updatedUser = await this.#prisma.user.update({
    //   where: { id },
    //   data: {
    //     nickname: updateUserDto.nickname,
    //   },
    // });
    // if (updatedUser) {
    //   return userToEntity(updatedUser);
    // }
    // return null;
  }
}
