import { PlaceAmenity } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  apiId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  addressName?: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsEnum(PlaceAmenity)
  amenity: PlaceAmenity;
}
