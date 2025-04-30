import { StatsType } from '../../enums/impl/stats-type.enum';
import { StatBonus } from '../../types/impl/stat-bonus.type';

export class StatBonusEntity implements StatBonus {
  public readonly id: string;
  public readonly type: StatsType;
  public readonly value: number;
  public readonly itemId: string | null;
  public readonly setEffectId: string | null;

  private constructor(data: StatBonus) {
    this.id = data.id;
    this.type = data.type;
    this.value = data.value;
    this.itemId = data.itemId;
    this.setEffectId = data.setEffectId;
  }

  public static create(data: StatBonus) {
    return new StatBonusEntity(data);
  }
}
