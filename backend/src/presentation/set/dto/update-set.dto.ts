import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { EffectDto } from '../../effect/dto/effect.dto';

export class UpdateSetDto {
  @IsString({ message: 'MUST_BE_STRING' })
  public readonly name: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  public readonly description?: string;

  @ValidateNested({ each: true })
  @Type(() => EffectDto)
  public readonly effects: EffectDto[];
}
