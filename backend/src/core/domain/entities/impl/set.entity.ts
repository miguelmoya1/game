import { Effect, Set } from '../../types';
import { ItemEntity } from './item.entity';

export class SetEntity implements Set {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;

  public readonly items?: ItemEntity[] | null;
  public readonly effects?: Effect[] | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(set: Set) {
    this.id = set.id;
    this.name = set.name;
    this.description = set.description;

    this.items = set.items;
    this.effects = set.effects;

    this.createdAt = set.createdAt;
    this.updatedAt = set.updatedAt;
    this.deletedAt = set.deletedAt;
  }

  public static create(set: Set) {
    return new SetEntity(set);
  }
}
