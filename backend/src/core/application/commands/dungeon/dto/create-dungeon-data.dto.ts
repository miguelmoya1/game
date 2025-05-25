import { DungeonType, Rank } from '../../../../domain/enums';

export class CreateDungeonDataDto {
  public readonly placeId: string;
  public readonly placeName: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly type: DungeonType;
  public readonly rank: Rank;
  public readonly durationSeconds: number;
  public readonly maxPlayers: number;
}
