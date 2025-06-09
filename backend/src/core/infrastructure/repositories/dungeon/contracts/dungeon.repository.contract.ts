import { CreateDungeonDataDto } from '../../../../application/commands';
import { DungeonEntity } from '../../../../domain/entities';

export interface DungeonRepository {
  create(data: CreateDungeonDataDto): Promise<DungeonEntity>;
  findById(dungeonId: string): Promise<DungeonEntity | null>;
  findNearby(
    lat: number,
    lng: number,
    radiusKm: number,
  ): Promise<DungeonEntity[]>;
  update(dungeon: DungeonEntity): Promise<DungeonEntity>;
  delete(dungeonId: string): Promise<void>;

  cleanStaleActivePlaces(): Promise<number>;
  getActiveDungeonPlaceIds(): Promise<string[]>;
}

export const DUNGEON_REPOSITORY = Symbol('DungeonRepository');
