import { CreateDungeonDataDto } from '../../../../application/commands';
import { DungeonEntity } from '../../../../domain/entities';

export interface DungeonRepository {
  create(data: CreateDungeonDataDto): Promise<DungeonEntity>;
  findById(dungeonId: string): Promise<DungeonEntity | null>;
  hasActiveDungeon(placeIds: string[]): Promise<Record<string, boolean>>;
  update(dungeon: DungeonEntity): Promise<DungeonEntity>;
  delete(dungeonId: string): Promise<void>;

  cleanStaleActivePlaces(): Promise<number>;
  getActiveDungeonPlaceIds(): Promise<string[]>;
}

export const DUNGEON_REPOSITORY = Symbol('DungeonRepository');
