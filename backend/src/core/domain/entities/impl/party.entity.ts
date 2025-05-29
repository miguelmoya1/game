import { PartyStatus } from '../../enums';
import { Player, PlayerEntity } from './player.entity';

export abstract class Party {
  public readonly id: string;
  public readonly leaderId: string;
  public readonly maxMembers: number;
  public readonly creationTime: Date;
  public readonly description?: string;
  public readonly status?: PartyStatus;
  public readonly memberIds?: string[];
  public readonly members?: Player[];

  protected constructor(party: Party) {
    this.id = party.id;
    this.leaderId = party.leaderId;
    this.maxMembers = party.maxMembers;
    this.creationTime = party.creationTime;
    this.description = party.description;
    this.status = party.status;
    this.memberIds = party.memberIds;
    this.members = party.members;
  }
}

export class PartyEntity extends Party {
  declare public readonly members?: PlayerEntity[];

  private constructor(party: Party) {
    super(party);

    if (party.members) {
      this.members = party.members.map((m) => PlayerEntity.create(m));
    }
  }

  public static create(party: Party) {
    return new PartyEntity(party);
  }
}
