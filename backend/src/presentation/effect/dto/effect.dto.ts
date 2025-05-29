import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { EffectTarget, EffectType, Stats } from '../../../core/domain/enums';

export class EffectDto {
  @IsEnum(EffectType, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: EffectType,
    },
  })
  readonly type: EffectType;

  @IsNumber({}, { message: 'MUST_BE_NUMBER' })
  readonly value: number;

  @IsEnum(EffectTarget, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: EffectTarget,
    },
  })
  readonly target: EffectTarget;

  @IsOptional()
  @IsEnum(Stats, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: Stats,
    },
  })
  readonly stats?: Stats;

  @IsOptional()
  @IsNumber({}, { message: 'MUST_BE_NUMBER' })
  readonly minimumItems?: number;
}
