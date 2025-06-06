import { ItemEntity } from '../../../../domain/entities';
import { ItemType, PlaceCategory, Rank } from '../../../../domain/enums';
import { Effect } from '../../../../domain/types';
import { ItemPermissions } from '../../../services';
import { SetResponseDto } from '../../set/dto/set-response.dto';

export class ItemResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly imageUrl: string | null;
  public readonly effects?: Effect[] | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly permissions: ItemPermissions;

  public readonly setId?: string | null;
  public readonly set?: SetResponseDto | null;

  private constructor(props: {
    id: string;
    name: string;
    description: string | null;
    itemType: ItemType;
    imageUrl: string | null;
    effects?: Effect[] | null;
    rank: Rank | null;
    setId?: string | null;
    spawnCategories: PlaceCategory[];
    createdAt: Date;
    updatedAt: Date;
    permissions: ItemPermissions;
    set?: SetResponseDto | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.itemType = props.itemType;
    this.imageUrl = props.imageUrl;
    this.effects = props.effects;
    this.rank = props.rank;
    this.spawnCategories = props.spawnCategories;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.permissions = props.permissions;
    this.setId = props.setId;
    this.set = props.set;

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
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      permissions: permissions,
      set: item.set ? SetResponseDto.create(item.set) : null,
    };

    return new ItemResponseDto(dtoProps);
  }
}
