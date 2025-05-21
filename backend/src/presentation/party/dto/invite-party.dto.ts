import { IsOptional, IsString } from 'class-validator';

export class InvitePartyDto {
  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  partyId?: string;

  @IsString({ message: 'MUST_BE_STRING' })
  playerId: string;
}
