import { CreatePlayerDataDto } from '../dto/create-player-data.dto';

export class CreatePlayerCommand {
  constructor(public readonly createPlayerDataDto: CreatePlayerDataDto) {}
}
