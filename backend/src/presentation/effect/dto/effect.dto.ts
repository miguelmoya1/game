import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { EffectType, StatsType, Target } from '../../../core/domain/enums';

export class EffectDto {
  @IsOptional()
  @IsEnum(EffectType, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: EffectType,
    },
  })
  readonly type?: EffectType;

  @IsOptional()
  @IsNumber({}, { message: 'MUST_BE_NUMBER' })
  readonly value?: number;

  @IsOptional()
  @IsEnum(Target, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: Target,
    },
  })
  readonly target?: Target;

  @IsOptional()
  @IsEnum(StatsType, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: StatsType,
    },
  })
  readonly stats?: StatsType;

  @IsOptional()
  @IsNumber({}, { message: 'MUST_BE_NUMBER' })
  readonly minimumItems?: number;
}
