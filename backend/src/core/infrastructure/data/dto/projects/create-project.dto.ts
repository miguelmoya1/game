import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  readonly ownerId: string;
}
