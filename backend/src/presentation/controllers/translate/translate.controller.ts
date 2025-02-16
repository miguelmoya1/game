import { Public } from '@game/guards';
import { TranslateService } from '@game/services';
import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Controller('translate')
export class TranslateController {
  constructor(private readonly _translateService: TranslateService) {}

  @Get()
  @Public()
  public getTranslate(@Req() req: FastifyRequest) {
    return this._translateService.getTranslate(req);
  }
}
