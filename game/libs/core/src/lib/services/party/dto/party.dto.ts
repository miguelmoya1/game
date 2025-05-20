import { PartyStatus } from '../../../enums/party-status.enum';

export type PartyDto = {
  id: string;
  leaderId: string;
  memberIds: string[];
  maxMembers: number;
  creationTime: Date;
  description?: string;
  status?: PartyStatus;
};
