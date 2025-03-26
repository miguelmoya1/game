import { PlaceAmenity } from '../../domain/entities/place.entity';

export type Place_db = {
  readonly id: string;
  readonly api_id: number;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  readonly address_name: string | null;
  readonly amenity: PlaceAmenity;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
};
