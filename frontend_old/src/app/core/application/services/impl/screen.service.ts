import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  #breakpointObserver = new BreakpointObserver();

  public readonly currentScreen = toSignal(
    this.#breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]),
  );

  public readonly isXSmall = computed(() => this.currentScreen()?.breakpoints[Breakpoints.XSmall] ?? false);

  public readonly isSmall = computed(() => this.currentScreen()?.breakpoints[Breakpoints.Small] ?? false);

  public readonly isMedium = computed(() => this.currentScreen()?.breakpoints[Breakpoints.Medium] ?? false);

  public readonly isLarge = computed(() => this.currentScreen()?.breakpoints[Breakpoints.Large] ?? false);

  public readonly isXLarge = computed(() => this.currentScreen()?.breakpoints[Breakpoints.XLarge] ?? false);
}
