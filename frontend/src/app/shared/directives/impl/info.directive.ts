import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gameInfo]',
})
export class InfoDirective {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  constructor() {
    const styles: { [key: string]: string } = {
      color: 'var(--color-info)',
      fontSize: 'var(--font-size-info)',
      fontFamily: 'italic',
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.#renderer.setStyle(this.#el.nativeElement, prop, value);
    });
  }
}
