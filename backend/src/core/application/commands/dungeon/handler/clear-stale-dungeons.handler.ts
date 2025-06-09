import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  DUNGEON_REPOSITORY,
  DungeonRepository,
} from '../../../../infrastructure/repositories';
import { ClearStaleDungeonsCommand } from '../impl/clear-stale-dungeons.command';

@CommandHandler(ClearStaleDungeonsCommand)
export class ClearStaleDungeonsHandler
  implements ICommandHandler<ClearStaleDungeonsCommand>
{
  constructor(
    @Inject(DUNGEON_REPOSITORY)
    private readonly dungeonRepository: DungeonRepository,
  ) {}

  async execute() {
    await this.dungeonRepository.cleanStaleActivePlaces();
  }
}
