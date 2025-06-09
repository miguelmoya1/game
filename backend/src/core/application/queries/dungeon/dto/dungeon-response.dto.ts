import { Rank } from '@prisma/client';
import { Reward } from '../../../../domain/entities';
import { DungeonStatus, DungeonType } from '../../../../domain/enums';

export class DungeonResponseDto {
  readonly placeId: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: DungeonType;
  readonly rank: Rank;
  readonly status: DungeonStatus;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly rewards: Reward[];

  private constructor(props: {
    placeId: string;
    lat: number;
    lng: number;
    type: DungeonType;
    rank: Rank;
    status: DungeonStatus;
    startTime: Date;
    endTime: Date;
    rewards: Reward[];
  }) {
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

  public static create(props: {
    placeId: string;
    lat: number;
    lng: number;
    type: DungeonType;
    rank: Rank;
    status: DungeonStatus;
    startTime: Date;
    endTime: Date;
    rewards: Reward[];
  }) {
    return new DungeonResponseDto(props);
  }
}
