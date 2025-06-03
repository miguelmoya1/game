import { PartyStatus } from '../enums/party.enum';

export abstract class Party {
  public readonly id: string;
  public readonly leaderId: string;
  public readonly maxMembers: number;
  public readonly creationTime: Date;
  public readonly description?: string;
  public readonly status?: PartyStatus;
  public readonly memberIds: string[];

  protected constructor(party: Party) {
    this.id = party.id;
    this.leaderId = party.leaderId;
    this.maxMembers = party.maxMembers;
    this.creationTime = party.creationTime;
    this.description = party.description;
    this.status = party.status;
    this.memberIds = party.memberIds;
  }
}

export class PartyEntity extends Party {
  public static create(party: Party) {
    return new PartyEntity(party);
  }
}
