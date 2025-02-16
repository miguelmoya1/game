import { UserProjectRole } from '@prisma/client';
import { IsEnum, IsString, IsUUID } from 'class-validator';

class JoinedDto {
  @IsString()
  @IsUUID('4')
  invitedId: string;

  @IsString()
  @IsUUID('4')
  projectId: string;
}

export class CreateJoinedDto extends JoinedDto {
  @IsString()
  @IsUUID('4')
  inviterId: string;

  @IsEnum(UserProjectRole)
  role: UserProjectRole;
}

export class UpdateJoinedDto {
  @IsEnum(UserProjectRole)
  role: UserProjectRole;
}
