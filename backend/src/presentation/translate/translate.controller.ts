import { Controller, Get, Param, Req } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FastifyRequest } from 'fastify';
import {
  GetLanguageQuery,
  GetTranslateQuery,
} from '../../core/application/queries';
import { IsPublic } from '../../core/infrastructure/decorators';

@Controller('translate')
export class TranslateController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  @IsPublic()
  public getTranslate(@Req() req: FastifyRequest) {
    const command = new GetTranslateQuery(req);

    return this._queryBus.execute(command);
  }

  @Get('languages')
  @IsPublic()
  public getLanguages() {
    const command = new GetLanguageQuery();

    return this._queryBus.execute(command);
  }

  @Get('/:lang')
  @IsPublic()
  public getTranslateByLanguage(
    @Req() req: FastifyRequest,
    @Param('lang') lang: string,
  ) {
    const command = new GetTranslateQuery(req, lang);

    return this._queryBus.execute(command);
  }
}
