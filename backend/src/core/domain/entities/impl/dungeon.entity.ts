import { DungeonStatus, DungeonType, Rank } from '../../enums';
import { Dungeon } from '../../types/impl/dungeon.type';
import { ItemEntity } from './item.entity';

export class DungeonEntity {
  public readonly id: string;
  public readonly placeId: string;
  public readonly placeName: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly type: DungeonType;
  public readonly rank: Rank;
  public readonly status: DungeonStatus;
  public readonly startTime: Date;
  public readonly endTime: Date;
  public readonly maxPlayers: number;
  public readonly memberIds: string[];
  public readonly rewards?: ItemEntity[];

  private constructor(props: Dungeon) {
    this.id = props.id;
    this.placeId = props.placeId;
    this.placeName = props.placeName;
    this.lat = props.lat;
    this.lng = props.lng;
    this.type = props.type;
    this.rank = props.rank;
    this.status = props.status;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.maxPlayers = props.maxPlayers;
    this.memberIds = props.memberIds;
    this.rewards = props.rewards;
  }

  public static create(props: Dungeon) {
    return new DungeonEntity(props);
  }
}
