import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary' | 'outlined';

@Directive({
  selector: '[gameButton]',
})
export class ButtonDirective {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);
  public readonly style = input<ButtonStyle>('primary');
  public readonly disabled = input<boolean>(false);

  constructor() {
    const styles: { [key: string]: string } = {
      display: 'block',
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-primary)',
      padding: '8px 18px',
      fontSize: '0.9rem',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      borderRadius: '0',
      outline: 'none',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxSizing: 'border-box',
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.#renderer.setStyle(this.#el.nativeElement, prop, value);
    });

    effect(() => {
      const style = this.style();
      const disabled = this.disabled();

      this.#prepareStyle(style, disabled);
    });
  }

  #prepareStyle(style: ButtonStyle, disabled: boolean) {
    if (disabled) {
      this.#renderer.setStyle(
        this.#el.nativeElement,
        'backgroundColor',
        'var(--color-disabled)',
      );
      this.#renderer.setStyle(
        this.#el.nativeElement,
        'color',
        'var(--color-disabled-text)',
      );
      this.#renderer.setStyle(
        this.#el.nativeElement,
        'border',
        '1px solid var(--color-disabled)',
      );
      this.#renderer.setStyle(this.#el.nativeElement, 'cursor', 'not-allowed');
      return;
    }

    this.#renderer.setStyle(
      this.#el.nativeElement,
      'backgroundColor',
      'transparent',
    );
    this.#renderer.setStyle(this.#el.nativeElement, 'cursor', 'pointer');

    switch (style) {
      case 'primary':
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'border',
          '1px solid var(--color-primary)',
        );
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'color',
          'var(--color-primary)',
        );
        break;
      case 'secondary':
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'border',
          '1px solid var(--color-secondary)',
        );
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'color',
          'var(--color-secondary)',
        );
        break;
      case 'tertiary':
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'border',
          '1px solid var(--color-tertiary)',
        );
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'color',
          'var(--color-tertiary)',
        );
        break;
      case 'outlined':
        this.#renderer.setStyle(this.#el.nativeElement, 'border', 'none');
        this.#renderer.setStyle(
          this.#el.nativeElement,
          'color',
          'var(--color-primary)',
        );
        this.#renderer.setStyle(this.#el.nativeElement, 'display', 'inline');
        break;
    }
  }
}
