import { IsArray, IsOptional, IsString } from 'class-validator';
import { ItemType, PlaceCategory, Rank } from '../../../core/domain/enums';
import { Effect } from '../../../core/domain/types';

export class UpdateItemDto {
  @IsString({ message: 'MUST_BE_STRING' })
  declare readonly name: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  declare readonly description?: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  declare readonly imageUrl?: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  declare readonly rank?: Rank;

  @IsString({ message: 'MUST_BE_STRING' })
  declare readonly itemType: ItemType;

  @IsOptional()
  @IsArray({ message: 'MUST_BE_ARRAY' })
  declare readonly effects?: Effect[];

  @IsOptional()
  @IsArray({ message: 'MUST_BE_ARRAY' })
  declare readonly spawnCategories?: PlaceCategory[];

  @IsOptional()
  declare readonly setId?: string;
}
