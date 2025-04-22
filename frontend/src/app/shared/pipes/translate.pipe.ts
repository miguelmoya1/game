import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@game/core/services/translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  readonly #translateService = inject(TranslateService);

  transform(value: unknown, ...args: unknown[]) {
    return this.#translateService.translates.value()[value as string] ?? value;
  }
}
