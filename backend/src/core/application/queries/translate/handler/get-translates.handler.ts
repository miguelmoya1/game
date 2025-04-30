import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TRANSLATE_SERVICE,
  TranslateService,
} from '../../../services/translate/translate.service.contract';
import { GetTranslateQuery } from '../impl/get-translate.query';

@QueryHandler(GetTranslateQuery)
export class GetTranslateHandler implements IQueryHandler<GetTranslateQuery> {
  constructor(
    @Inject(TRANSLATE_SERVICE)
    private readonly _translateService: TranslateService,
  ) {}

  execute(query: GetTranslateQuery) {
    const { req, lang } = query;

    return Promise.resolve(this._translateService.getTranslate(req, lang));
  }
}
