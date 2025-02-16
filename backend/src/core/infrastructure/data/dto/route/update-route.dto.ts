import { HttpMethod } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UpdateRouteDto {
  @IsString()
  @IsNotEmpty()
  public readonly path: string;

  @IsEnum(HttpMethod)
  public readonly method: HttpMethod;

  @IsObject()
  public readonly body: JsonObject;
}
