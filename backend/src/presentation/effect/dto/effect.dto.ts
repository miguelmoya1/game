import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import {
  EffectTarget,
  EffectType,
  StatsTypes,
} from '../../../core/domain/enums';

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
  @IsEnum(StatsTypes, {
    message: 'MUST_BE_ENUM',
    context: {
      enum: StatsTypes,
    },
  })
  readonly statType?: StatsTypes;

  @IsOptional()
  @IsNumber({}, { message: 'MUST_BE_NUMBER' })
  readonly minimumItems?: number;
}
