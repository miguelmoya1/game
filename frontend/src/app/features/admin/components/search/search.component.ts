import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'game-search',
  imports: [TranslatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  protected readonly search = new FormControl('', {
    nonNullable: true,
    validators: [],
  });
  protected readonly searchChanged = output<string>();

  constructor() {
    this.search.valueChanges.pipe(takeUntilDestroyed(), debounceTime(500)).subscribe((value) => {
      this.searchChanged.emit(value);
    });
  }
}
