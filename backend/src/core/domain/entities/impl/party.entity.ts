import { PartyStatus } from '../../enums';
import { Party } from '../../types';

export class PartyEntity implements Party {
  declare public readonly id: string;
  declare public readonly leaderId: string;
  declare public readonly maxMembers: number;
  declare public readonly creationTime: Date;
  declare public readonly description?: string;
  declare public readonly status?: PartyStatus;
  declare public readonly memberIds?: string[];

  private constructor(party: Party) {
    this.id = party.id;
    this.leaderId = party.leaderId;
    this.maxMembers = party.maxMembers;
    this.creationTime = party.creationTime;
    this.description = party.description;
    this.status = party.status;
    this.memberIds = party.memberIds;
  }

  public static create(party: Party) {
    return new PartyEntity(party);
  }
}
