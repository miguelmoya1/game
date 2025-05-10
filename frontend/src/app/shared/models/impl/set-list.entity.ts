export class SetListEntity {
  public readonly id: string;
  public readonly name: string;

  private constructor(place: { id: string; name: string }) {
    this.id = place.id;
    this.name = place.name;
  }

  public static create(place: { id: string; name: string }) {
    return new SetListEntity(place);
  }
}
