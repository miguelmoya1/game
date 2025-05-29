export abstract class Spell {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly raceId: string;
  public readonly imageUrl: string;

  public readonly requiredLevel?: number;
  public readonly manaCost?: number;
  public readonly cooldown?: number;

  protected constructor(race: Spell) {
    this.id = race.id;
    this.name = race.name;
    this.description = race.description;
    this.raceId = race.raceId;
    this.imageUrl = race.imageUrl;
    this.requiredLevel = race.requiredLevel;
    this.manaCost = race.manaCost;
    this.cooldown = race.cooldown;
  }
}

export class SpellEntity extends Spell {
  public static create(race: Spell) {
    return new SpellEntity(race);
  }
}
