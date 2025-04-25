import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gameBorder]',
})
export class GameBorderDirective {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  constructor() {
    const styles: { [key: string]: string } = {
      border: '1px solid var(--color-border)',
      borderRadius: '0',
      boxShadow: '0 0 4px 2px var(--color-border)',
      padding: '1rem',
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.#renderer.setStyle(this.#el.nativeElement, prop, value);
    });
  }
}
