import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';
import { CreatePartyDataDto } from '../dto/create-party-data.dto';

export class CreatePartyCommand implements ICommand {
  constructor(
    public readonly data: CreatePartyDataDto,
    public readonly user: UserEntity,
  ) {}
}
