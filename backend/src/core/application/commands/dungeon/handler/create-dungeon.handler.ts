import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from 'src/core/domain/enums';
import { DUNGEON_REPOSITORY, DungeonRepository } from '../../../../infrastructure/repositories';
import { CreateDungeonCommand } from '../impl/create-dungeon.command';

@CommandHandler(CreateDungeonCommand)
export class CreateDungeonHandler implements ICommandHandler<CreateDungeonCommand> {
  constructor(
    @Inject(DUNGEON_REPOSITORY)
    private readonly dungeonRepository: DungeonRepository,
  ) {}

  async execute(command: CreateDungeonCommand) {
    const { createDungeonDto, user } = command;

    if (user && !user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    await this.dungeonRepository.create(createDungeonDto);
  }
}
