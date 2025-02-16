import { ApiKeyBuilder } from '@game/builder';
import { ApiKeyEntity } from '@game/entities';
import { ApiKey } from '@prisma/client';

export const apiKeyToEntity = (apiKey: ApiKey): ApiKeyEntity => {
  return new ApiKeyBuilder(apiKey.id, apiKey.createdAt)
    .withUserId(apiKey.ownerId)
    .withProjectId(apiKey.projectId)
    .withKey(apiKey.key)
    .withDescription(apiKey.description)

    .build();
};
