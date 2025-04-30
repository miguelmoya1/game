import { StatsType } from '../../../../domain/enums/impl/stats-type.enum';
import { StatBonus } from '../../../../domain/types/impl/stat-bonus.type';

export class StatBonusResponseDto {
  public readonly id: string;
  public readonly type: StatsType;
  public readonly value: number;
  public readonly itemId: string | null;
  public readonly setEffectId: string | null;

  private constructor(props: {
    id: string;
    type: StatsType;
    value: number;
    itemId: string | null;
    setEffectId: string | null;
  }) {
    this.id = props.id;
    this.type = props.type;
    this.value = props.value;
    this.itemId = props.itemId;
    this.setEffectId = props.setEffectId;

    Object.freeze(this);
  }

  public static create(statBonus: StatBonus) {
    return new StatBonusResponseDto(statBonus);
  }
}
