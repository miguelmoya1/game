import { SetEntity } from '../../../../domain/entities';
import { Effect } from '../../../../domain/types';

export class SetResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly effects?: Effect[] | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(props: {
    id: string;
    name: string;
    description: string | null;
    effects?: Effect[] | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.effects = props.effects;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    Object.freeze(this);
  }

  public static create(set: SetEntity) {
    const dtoProps = {
      id: set.id,
      name: set.name,
      description: set.description,
      effects: set.effects,
      createdAt: set.createdAt,
      updatedAt: set.updatedAt,
      deletedAt: set.deletedAt,
    };

    return new SetResponseDto(dtoProps);
  }
}
