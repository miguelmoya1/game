import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;
}
