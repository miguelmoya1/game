import { PartyStatus } from '../../../../domain/enums';

export type CreatePartyDataDto = {
  readonly leaderId: string;
  readonly description?: string;
  readonly status: PartyStatus;
};
