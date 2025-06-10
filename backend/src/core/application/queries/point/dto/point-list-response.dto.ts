import { PlacePermissions } from 'src/core/application/services';

export class PointListResponseDto {
  public readonly lat: number;
  public readonly lng: number;
  public readonly placeId: string;
  public readonly hasDungeon: boolean;
  public readonly placePermissions: PlacePermissions;

  protected constructor(props: {
    lat: number;
    lng: number;
    placeId: string;
    hasDungeon: boolean;
    placePermissions: PlacePermissions;
  }) {
    this.lat = props.lat;
    this.lng = props.lng;
    this.placeId = props.placeId;
    this.hasDungeon = props.hasDungeon;
    this.placePermissions = props.placePermissions;
  }

  public static create(pointListResponseDto: PointListResponseDto) {
    return new PointListResponseDto({
      lat: pointListResponseDto.lat,
      lng: pointListResponseDto.lng,
      placeId: pointListResponseDto.placeId,
      hasDungeon: pointListResponseDto.hasDungeon,
      placePermissions: pointListResponseDto.placePermissions,
    });
  }
}
