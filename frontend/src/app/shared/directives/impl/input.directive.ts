import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gameInput]',
})
export class InputDirective {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  constructor() {
    const styles: { [key: string]: string } = {
      display: 'block',
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-primary)',
      padding: '8px 18px',
      fontSize: '0.9rem',
      textDecoration: 'none',
      cursor: 'pointer',
      borderRadius: '0',
      outline: 'none',
      letterSpacing: '0.5px',
      boxSizing: 'border-box',
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.#renderer.setStyle(this.#el.nativeElement, prop, value);
    });
  }
}
