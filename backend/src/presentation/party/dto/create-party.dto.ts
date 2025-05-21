import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PartyStatus } from '../../../core/domain/enums';

export class CreatePartyDto {
  @IsString({ message: 'MUST_BE_STRING' })
  public readonly leaderId: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  public readonly description?: string;

  @IsEnum(PartyStatus, { message: 'MUST_BE_PARTY_STATUS' })
  public readonly status: PartyStatus;
}
