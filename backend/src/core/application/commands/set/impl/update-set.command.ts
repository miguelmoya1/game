import { UserEntity } from '../../../../domain/entities';
import { UpdateSetDataDto } from '../dto/update-set-data.dto';

export class UpdateSetCommand {
  constructor(
    public readonly setId: string,
    public readonly updateSetDataDto: UpdateSetDataDto,
    public readonly user: UserEntity,
  ) {}
}
