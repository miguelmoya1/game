import { ItemEntity } from '../../../domain/entities';
import { ItemType, PlaceCategory, Rank } from '../../../domain/enums';
import { ItemPermissions } from '../../services/permissions/types/item-permissions.type';

export class ItemResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly useEffect: string | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly permissions: ItemPermissions;

  private constructor(props: {
    id: string;
    name: string;
    description: string | null;
    itemType: ItemType;
    useEffect: string | null;
    rank: Rank | null;
    spawnCategories: PlaceCategory[];
    createdAt: Date;
    updatedAt: Date;
    permissions: ItemPermissions;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.itemType = props.itemType;
    this.useEffect = props.useEffect;
    this.rank = props.rank;
    this.spawnCategories = props.spawnCategories;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.permissions = props.permissions;

    Object.freeze(this);
  }

  public static create(item: ItemEntity, permissions: ItemPermissions) {
    const dtoProps = {
      id: item.id,
      name: item.name,
      description: item.description,
      itemType: item.itemType,
      useEffect: item.useEffect,
      rank: item.rank,
      spawnCategories: item.spawnCategories,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      permissions: permissions,
    };

    return new ItemResponseDto(dtoProps);
  }
}
