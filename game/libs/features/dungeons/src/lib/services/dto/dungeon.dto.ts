import { Rank } from '@game/shared';
import { Reward } from '../../entities/dungeon.entity';
import { DungeonStatus, DungeonType } from '../../enums/dungeon.enums';

export interface DungeonDto {
  readonly placeId: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: DungeonType;
  readonly rank: Rank;
  readonly status: DungeonStatus;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly rewards: Reward[];
}
