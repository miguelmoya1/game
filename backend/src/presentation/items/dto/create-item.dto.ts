import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { ItemType, PlaceCategory, Rank } from '../../../core/domain/enums';
import { Effect } from '../../../core/domain/types';

export class CreateItemDto {
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
  declare readonly effect?: Effect[];

  @IsOptional()
  @IsArray({ message: 'MUST_BE_ARRAY' })
  declare readonly spawnCategories?: PlaceCategory[];

  @IsOptional()
  @IsUUID('4', {
    message: 'MUST_BE_UUID',
    context: {
      version: 4,
    },
  })
  declare readonly setId?: string;
}
