import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ClearStaleDungeonsCommand,
  GenerateDungeonsCommand,
} from '../../application/commands';

@Injectable()
export class DungeonsCrons {
  readonly #logger = new Logger(DungeonsCrons.name);
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleDailyDungeonGeneration() {
    await this.commandBus.execute(new GenerateDungeonsCommand());
    this.#logger.debug('Generated dungeons executed');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleStaleDungeonCleanup() {
    await this.commandBus.execute(new ClearStaleDungeonsCommand());
    this.#logger.debug('Stale dungeon cleanup executed');
  }
}
