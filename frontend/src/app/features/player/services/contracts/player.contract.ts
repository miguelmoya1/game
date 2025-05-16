import { PlayerEntity } from '../../../../shared/models/impl/player.entity';

export abstract class PlayerService {
  abstract readonly player: ReadonlySignal<PlayerEntity | null>;
}
