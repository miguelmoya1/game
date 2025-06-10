import { SetEntity } from '../../../../domain/entities';
import { Effect } from '../../../../domain/types';

export class SetResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly effects?: Effect[] | null;

  private constructor(props: { id: string; name: string; description: string | null; effects?: Effect[] | null }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.effects = props.effects;

    Object.freeze(this);
  }

  public static create(set: SetEntity) {
    const dtoProps = {
      id: set.id,
      name: set.name,
      description: set.description,
      effects: set.effects,
    };

    return new SetResponseDto(dtoProps);
  }
}
