export abstract class Race {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly isPlayable: boolean;

  protected constructor(race: Race) {
    this.id = race.id;
    this.name = race.name;
    this.description = race.description;
    this.isPlayable = race.isPlayable;
  }
}

export class RaceEntity extends Race {
  public static create(race: Race) {
    return new RaceEntity(race);
  }
}
