import { Effect, Set } from '../../types';

export class SetEntity implements Set {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly effects?: Effect[] | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(place: Set) {
    this.id = place.id;
    this.name = place.name;
    this.description = place.description;
    this.effects = place.effects;

    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.deletedAt = place.deletedAt;
  }

  public static create(place: Set) {
    return new SetEntity(place);
  }
}
