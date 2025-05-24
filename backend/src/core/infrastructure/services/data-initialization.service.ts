import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as fs from 'fs';
import * as path from 'path';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from 'src/core/application/services';
import {
  CreateItemCommand,
  CreateItemDataDto,
  CreateSetCommand,
  CreateSetDataDto,
} from '../../application/commands';
import { UserEntity } from '../../domain/entities';

@Injectable()
export class DataInitializationService implements OnModuleInit {
  private readonly logger = new Logger(DataInitializationService.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(DATABASE_SERVICE)
    private readonly databaseService: DatabaseService,
  ) {}

  onModuleInit() {
    setTimeout(() => {
      void (async () => {
        await this.seedSetsIfEmpty().catch((err) => {
          this.logger.error('Error seeding sets', err);
        });

        await this.seedItemsIfEmpty().catch((err) => {
          this.logger.error('Error seeding items', err);
        });
      })();
    }, 5000);
  }

  async seedItemsIfEmpty() {
    const itemCount = await this.databaseService.item.count();
    if (itemCount === 0) {
      this.logger.log('No items found in DB. Seeding base items...');
      const items = this.#loadFromFile<CreateItemDataDto>('items.json');
      if (!items) return;
      for (const item of items) {
        await this.commandBus.execute(
          new CreateItemCommand(item, {
            isAdmin: () => true,
          } as unknown as UserEntity),
        );
      }
      this.logger.log('Base items seeded');
    }
  }

  async seedSetsIfEmpty() {
    const setCount = await this.databaseService.set.count();
    if (setCount === 0) {
      this.logger.log('No sets found in DB. Seeding base sets...');
      const sets = this.#loadFromFile<CreateSetDataDto>('sets.json');
      if (!sets) return;
      for (const set of sets) {
        await this.commandBus.execute(
          new CreateSetCommand(set, {
            isAdmin: () => true,
          } as unknown as UserEntity),
        );
      }
      this.logger.log('Base sets seeded');
    }
  }

  #loadFromFile<T = unknown>(filename: string) {
    try {
      const filePath = path.join('data', filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as unknown as T[];
    } catch (e) {
      this.logger.error(`Error loading ${filename}`, e);
      return null;
    }
  }
}
