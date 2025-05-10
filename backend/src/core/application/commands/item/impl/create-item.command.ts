import { UserEntity } from '../../../../domain/entities';
import { CreateItemDataDto } from '../dto/create-item-data.dto';

export class CreateItemCommand {
  constructor(
    public readonly createItemDataDto: CreateItemDataDto,
    public readonly user: UserEntity,
  ) {}
}
