import { User } from '@game/entities';

export class RehydrateQuery {
  constructor(public readonly user: User) {}
}
