import { PartyStatus } from '../../enums/party.enum';

export type AggregatedStatDetail = {
  base: number;
  byLevel: number;
  bySet: number;
  byParty: number;
  byGuild: number;
  total: number;
};

export type AggregatedStats = Record<string, AggregatedStatDetail>;

export type PartyDto = {
  id: string;
  leaderId: string;
  memberIds: string[];
  maxMembers: number;
  creationTime: Date;
  description?: string;
  status?: PartyStatus;
};
