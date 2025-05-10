import { UserEntity } from '../../../../domain/entities';
import { CreateSetDataDto } from '../dto/create-set-data.dto';

export class CreateSetCommand {
  constructor(
    public readonly createSetDataDto: CreateSetDataDto,
    public readonly user: UserEntity,
  ) {}
}
