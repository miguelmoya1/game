import { Party } from '../../../../domain/entities';
import { PartyStatus } from '../../../../domain/enums';

export class PartyResponseDto {
  public readonly id: string;
  public readonly leaderId: string;
  public readonly maxMembers: number;
  public readonly creationTime: Date;
  public readonly description?: string;
  public readonly status?: PartyStatus;
  public readonly memberIds?: string[];

  private constructor(props: Party) {
    this.id = props.id;
    this.leaderId = props.leaderId;
    this.maxMembers = props.maxMembers;
    this.creationTime = props.creationTime;
    this.description = props.description;
    this.status = props.status;
    this.memberIds = props.memberIds;
    Object.freeze(this);
  }

  public static create(party: Party) {
    return new PartyResponseDto(party);
  }
}
