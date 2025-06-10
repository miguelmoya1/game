import { Injectable } from '@nestjs/common';
import { PlaceListEntity, PlayerItemCollectionLogEntity, UserEntity } from '../../../domain/entities';
import type { PermissionsService } from './permissions.service.contract';

@Injectable()
export class PermissionsServiceImpl implements PermissionsService {
  getItemPermissions(user: UserEntity) {
    return {
      canEdit: user.isAdmin(),
      canDelete: user.isAdmin(),
      canCreate: user.isAdmin(),
    };
  }

  getPlacePermissions(
    place: PlaceListEntity,
    playerItemCollectionLogs: PlayerItemCollectionLogEntity[],
    user: UserEntity,
  ) {
    const playerItemCollectionLog = playerItemCollectionLogs.find(
      (p) => p.placeId === place.id && p.isCollectedFrom(new Date()),
    );

    return {
      canEdit: user.isAdmin(),
      canDelete: user.isAdmin(),
      canCreate: user.isAdmin(),
      canBeClaimed: !playerItemCollectionLog?.isCollectedFrom(new Date()),
      alreadyClaimed: !!playerItemCollectionLog?.collectedAt,
    };
  }
}
