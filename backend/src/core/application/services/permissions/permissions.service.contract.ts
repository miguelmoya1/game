import { PlaceListEntity, PlayerItemCollectionLogEntity, UserEntity } from '../../../domain/entities';
import { ItemPermissions } from './types/item-permissions.type';
import { PlacePermissions } from './types/place-permissions.type';

export interface PermissionsService {
  getItemPermissions(user: UserEntity): ItemPermissions;
  getPlacePermissions(
    place: PlaceListEntity,
    playerItemCollectionLog: PlayerItemCollectionLogEntity[],
    user: UserEntity,
  ): PlacePermissions;
}

export const PERMISSIONS_SERVICE = Symbol('PERMISSIONS_SERVICE');
