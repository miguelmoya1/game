export class ListResponseDto {
  public readonly id: string;
  public readonly name: string;

  private constructor(props: { id: string; name: string }) {
    this.id = props.id;
    this.name = props.name;

    Object.freeze(this);
  }

  public static create(set: { id: string; name: string }) {
    const dtoProps = {
      id: set.id,
      name: set.name,
    };

    return new ListResponseDto(dtoProps);
  }
}
