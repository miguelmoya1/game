import { UserEntity } from 'src/core/domain/entities';
import { CreateDungeonDataDto } from '../dto/create-dungeon-data.dto';

export class CreateDungeonCommand {
  constructor(
    public readonly createDungeonDto: CreateDungeonDataDto,
    public readonly user?: UserEntity,
  ) {}
}
