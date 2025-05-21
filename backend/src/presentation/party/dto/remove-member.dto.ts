import { IsString } from 'class-validator';

export class RemoveMemberDto {
  @IsString({ message: 'MUST_BE_STRING' })
  partyId: string;

  @IsString({ message: 'MUST_BE_STRING' })
  playerId: string;
}
