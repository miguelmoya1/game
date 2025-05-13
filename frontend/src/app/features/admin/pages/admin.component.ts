import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective } from '../../../shared/directives';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { SearchCardComponent } from '../components/search-card/search-card.component';
import { SearchComponent } from '../components/search/search.component';
import { SearchServiceImpl } from '../services/search.service';
import { SEARCH_SERVICE } from '../services/search.service.contract';

type pathType = 'sets' | 'items' | 'places';

@Component({
  selector: 'game-admin',
  imports: [TranslatePipe, ButtonDirective, RouterLink, SearchComponent, SearchCardComponent],
  providers: [
    {
      provide: SEARCH_SERVICE,
      useClass: SearchServiceImpl,
    },
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  readonly #searchService = inject(SEARCH_SERVICE);
  readonly #router = inject(Router);

  protected readonly results = this.#searchService.searchList;
  protected readonly shouldDisplayInfo = computed(() => {
    return !this.#searchService.hasEnoughCharacters();
  });

  protected onSearch(query: string) {
    this.#searchService.search.set(query);
  }

  protected onClickEdit(type: pathType, id: string) {
    this.#router.navigate(['admin', type, id, 'edit']);
  }
}
