import { ItemEntity } from '../../../../domain/entities';
import { ItemType, PlaceCategory, Rank } from '../../../../domain/enums';
import { Effect } from '../../../../domain/types';
import { ItemPermissions } from '../../../services';

export class ItemResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly itemType: ItemType;
  public readonly imageUrl?: string;
  public readonly effects?: Effect[] | null;
  public readonly rank?: Rank;
  public readonly spawnCategories?: PlaceCategory[];
  public readonly permissions: ItemPermissions;

  public readonly setId?: string | null;

  private constructor(props: {
    id: string;
    name: string;
    description: string;
    itemType: ItemType;
    imageUrl?: string;
    effects: Effect[];
    rank?: Rank;
    setId?: string | null;
    spawnCategories?: PlaceCategory[];
    permissions: ItemPermissions;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.itemType = props.itemType;
    this.imageUrl = props.imageUrl;
    this.effects = props.effects;
    this.rank = props.rank;
    this.spawnCategories = props.spawnCategories;
    this.permissions = props.permissions;
    this.setId = props.setId;

    Object.freeze(this);
  }

  public static create(item: ItemEntity, permissions: ItemPermissions) {
    const dtoProps = {
      id: item.id,
      name: item.name,
      description: item.description,
      itemType: item.itemType,
      imageUrl: item.imageUrl,
      effects: item.effects,
      rank: item.rank,
      setId: item.setId,
      spawnCategories: item.spawnCategories,
      permissions: permissions,
    };

    return new ItemResponseDto(dtoProps);
  }
}
