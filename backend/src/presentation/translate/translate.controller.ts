import { Controller, Get, Inject, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import {
  TRANSLATE_SERVICE,
  TranslateService,
} from '../../core/application/services/translate/translate.service.contract';
import { IsPublic } from '../../core/infrastructure/decorators';

@Controller('translate')
export class TranslateController {
  constructor(
    @Inject(TRANSLATE_SERVICE)
    private readonly _translateService: TranslateService,
  ) {}

  @Get()
  @IsPublic()
  public getTranslate(@Req() req: FastifyRequest) {
    return this._translateService.getTranslate(req);
  }
}
