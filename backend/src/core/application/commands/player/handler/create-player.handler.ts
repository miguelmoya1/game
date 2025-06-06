import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatsType } from '../../../../domain/enums';
import {
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { CreatePlayerCommand } from '../impl/create-player.command';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async execute(command: CreatePlayerCommand) {
    const { createPlayerDataDto } = command;

    const stats = [
      {
        statsType: StatsType.HP,
        value: 100,
      },
      {
        statsType: StatsType.WIS,
        value: 0,
      },
      {
        statsType: StatsType.STR,
        value: 0,
      },
      {
        statsType: StatsType.DEX,
        value: 0,
      },
      {
        statsType: StatsType.CON,
        value: 0,
      },
      {
        statsType: StatsType.INT,
        value: 0,
      },
      {
        statsType: StatsType.CHA,
        value: 0,
      },
    ];

    await this._playerRepository.create({
      userId: createPlayerDataDto.userId,
      // TODO: add raceId, find HUMAN and add it to the player
      raceId: '497336ac-0ae1-4c24-882e-901f4d1076b7',
      stats,
    });
  }
}
