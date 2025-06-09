import { DungeonStatus, DungeonType, Rank } from '../../enums';

export enum RewardType {
  Item = 'ITEM',
}

export interface Reward {
  type: RewardType;
  id: string;
}

export abstract class Dungeon {
  public readonly placeId: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly type: DungeonType;
  public readonly rank: Rank;
  public readonly status: DungeonStatus;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly rewards: Reward[];

  protected constructor(props: Dungeon) {
    this.placeId = props.placeId;
    this.lat = props.lat;
    this.lng = props.lng;
    this.type = props.type;
    this.rank = props.rank;
    this.status = props.status;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.rewards = props.rewards;
  }
}

export class DungeonEntity extends Dungeon {
  public static create(props: Dungeon) {
    return new DungeonEntity(props);
  }
}
