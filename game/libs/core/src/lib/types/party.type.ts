import { PartyStatus } from '../enums/party-status.enum';
import { Player } from './player.type';

export interface Party {
  id: string;
  leaderId: string;
  memberIds: string[];
  maxMembers: number;
  creationTime: Date;
  description?: string;
  status?: PartyStatus;
  members?: Player[];
}
