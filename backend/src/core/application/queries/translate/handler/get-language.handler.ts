import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TRANSLATE_SERVICE,
  TranslateService,
} from '../../../services/translate/translate.service.contract';
import { GetLanguageQuery } from '../impl/get-languages.query';

@QueryHandler(GetLanguageQuery)
export class GetLanguageHandler implements IQueryHandler<GetLanguageQuery> {
  constructor(
    @Inject(TRANSLATE_SERVICE)
    private readonly _translateService: TranslateService,
  ) {}

  execute() {
    return Promise.resolve(this._translateService.getLanguages());
  }
}
