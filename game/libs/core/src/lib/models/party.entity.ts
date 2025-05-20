import { PartyStatus } from '../enums/party-status.enum';
import { Party } from '../types/party.type';

export class PartyEntity implements Party {
  public readonly id: string;
  public readonly leaderId: string;
  public readonly maxMembers: number;
  public readonly creationTime: Date;
  public readonly description?: string;
  public readonly status?: PartyStatus;
  public readonly memberIds: string[];

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
