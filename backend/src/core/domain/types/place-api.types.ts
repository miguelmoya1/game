import { PlaceAmenity } from '@prisma/client';

export interface PlaceApi {
  apiId: number;
  name: string;
  lat: number;
  lng: number;
  addressName: string;
  amenity: PlaceAmenity;
}
