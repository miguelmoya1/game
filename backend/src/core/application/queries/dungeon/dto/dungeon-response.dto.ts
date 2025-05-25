import { Rank } from '@prisma/client';
import { ItemEntity } from 'src/core/domain/entities';
import { DungeonStatus, DungeonType } from 'src/core/domain/enums';

export class DungeonResponseDto {
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
  readonly rewards?: ItemEntity[];

  private constructor(props: {
    id: string;
    placeId: string;
    placeName: string;
    lat: number;
    lng: number;
    type: DungeonType;
    rank: Rank;
    status: DungeonStatus;
    startTime: Date;
    endTime: Date;
    maxPlayers: number;
    memberIds: string[];
    rewards?: ItemEntity[];
  }) {
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

  public static create(props: {
    id: string;
    placeId: string;
    placeName: string;
    lat: number;
    lng: number;
    type: DungeonType;
    rank: Rank;
    status: DungeonStatus;
    startTime: Date;
    endTime: Date;
    maxPlayers: number;
    memberIds: string[];
    rewards?: ItemEntity[];
  }) {
    return new DungeonResponseDto(props);
  }
}
