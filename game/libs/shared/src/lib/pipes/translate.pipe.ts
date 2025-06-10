import { inject, Pipe, PipeTransform } from '@angular/core';
import { TRANSLATE_SERVICE } from '@game/shared';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  readonly #translateService = inject(TRANSLATE_SERVICE);

  transform(value: unknown) {
    return this.#translateService.translates.value()[value as string] ?? value;
  }
}
