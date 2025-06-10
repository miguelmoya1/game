import { DungeonEntity, PlaceEntity } from '../../../../domain/entities';

export class PointResponseDto {
  public readonly place: PlaceEntity;
  public readonly dungeon?: DungeonEntity;

  private constructor(props: { place: PlaceEntity; dungeon?: DungeonEntity }) {
    this.place = props.place;
    this.dungeon = props.dungeon;
  }

  public static create(pointResponseDto: PointResponseDto) {
    return new PointResponseDto({
      place: pointResponseDto.place,
      dungeon: pointResponseDto.dungeon,
    });
  }
}
