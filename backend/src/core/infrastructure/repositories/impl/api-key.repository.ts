import { CreateApiKeyDto } from '@game/data/dto';
import { apiKeyToEntity } from '@game/data/mappers';
import { PrismaService } from '@game/database';
import { ApiKeyEntity } from '@game/entities';
import { ApiKeyRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ApiKeyRepositoryImpl implements ApiKeyRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(registerDto: CreateApiKeyDto, userId: string): Promise<ApiKeyEntity | null> {
    const apiKey = await this._prisma.apiKey.create({
      data: {
        ...registerDto,
        ownerId: userId,
        key: randomUUID(),
      },
    });

    return apiKeyToEntity(apiKey);
  }
}
