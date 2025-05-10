export class SearchResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string | null;

  private constructor(props: {
    id: string;
    name: string;
    description?: string | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;

    Object.freeze(this);
  }

  public static create(data: {
    id: string;
    name: string;
    description?: string | null;
  }) {
    const dtoProps = {
      id: data.id,
      name: data.name,
      description: data.description,
    };

    return new SearchResponseDto(dtoProps);
  }
}
