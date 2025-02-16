import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID(4)
  @IsNotEmpty()
  projectId: string;
}
