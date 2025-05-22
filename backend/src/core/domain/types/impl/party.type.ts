import { PartyStatus } from '../../enums';
import { Player } from './player.type';

export type Party = {
  readonly id: string;
  readonly leaderId: string;
  readonly maxMembers: number;
  readonly creationTime: Date;
  readonly description?: string;
  readonly status?: PartyStatus;
  readonly memberIds?: string[];
  readonly members?: Player[];
};
