import { Effect } from '../../types';

export abstract class Set {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly effects: Effect[];

  protected constructor(set: Set) {
    this.id = set.id;
    this.name = set.name;
    this.description = set.description;
    this.effects = set.effects;
  }
}

export class SetEntity extends Set {
  public static create(set: Set) {
    return new SetEntity(set);
  }
}
