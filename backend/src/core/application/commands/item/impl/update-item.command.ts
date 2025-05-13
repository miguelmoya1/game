import { UserEntity } from '../../../../domain/entities';
import { UpdateItemDataDto } from '../dto/update-item-data.dto';

export class UpdateItemCommand {
  constructor(
    public readonly itemId: string,
    public readonly updateItemDataDto: UpdateItemDataDto,
    public readonly user: UserEntity,
  ) {}
}
