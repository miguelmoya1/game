import { PartyStatus } from '../../enums';

export type Party = {
  readonly id: string;
  readonly leaderId: string;
  readonly maxMembers: number;
  readonly creationTime: Date;
  readonly description?: string;
  readonly status?: PartyStatus;
  readonly memberIds?: string[];
};
