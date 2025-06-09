import { Rank } from '@game/shared';
import { DungeonStatus, DungeonType } from '../enums/dungeon.enums';
import { RewardType } from '../enums/reward.enum';

export type Reward = {
  type: RewardType;
  id: string;
};

export abstract class Dungeon {
  readonly placeId: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: DungeonType;
  readonly rank: Rank;
  readonly status: DungeonStatus;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly rewards: Reward[];

  protected constructor(props: Dungeon) {
    this.placeId = props.placeId;
    this.lat = props.lat;
    this.lng = props.lng;
    this.type = props.type;
    this.rank = props.rank;
    this.status = props.status;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.rewards = props.rewards || [];
  }
}

export class DungeonEntity extends Dungeon {
  public static create(props: Dungeon) {
    return new DungeonEntity(props);
  }
}
