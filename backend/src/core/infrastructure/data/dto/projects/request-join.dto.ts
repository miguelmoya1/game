import { IsString, IsUUID } from 'class-validator';

class RequestJoinDto {
  @IsString()
  @IsUUID('4')
  projectId: string;

  @IsString()
  @IsUUID('4')
  invitedId: string;
}

export class CreateRequestJoinDto extends RequestJoinDto {
  @IsString()
  @IsUUID('4')
  inviterId: string;
}

export class AcceptRequestJoinDto extends RequestJoinDto {
  @IsString()
  @IsUUID('4')
  inviterId: string;
}

export class RejectRequestJoinDto extends RequestJoinDto {}
