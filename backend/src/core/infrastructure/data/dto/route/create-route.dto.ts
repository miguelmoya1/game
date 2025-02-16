import { HttpMethod } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  public readonly path: string;

  @IsEnum(HttpMethod)
  public readonly method: HttpMethod;

  @Transform(({ value }) => JSON.parse(value))
  @IsNotEmpty()
  public readonly body: JsonObject;

  @IsUUID(4)
  @IsNotEmpty()
  public readonly projectId: string;
}
