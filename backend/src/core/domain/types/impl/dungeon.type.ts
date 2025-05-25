import { DungeonStatus, DungeonType, Rank } from '../../enums';
import { Item } from './item.type';

export type Dungeon = {
  readonly id: string;
  readonly placeId: string;
  readonly placeName: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: DungeonType;
  readonly rank: Rank;
  readonly status: DungeonStatus;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly maxPlayers: number;
  readonly memberIds: string[];
  readonly rewards?: Item[];
};
