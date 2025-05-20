import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@game/core';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { SearchCardComponent } from '../components/search-card/search-card.component';
import { SearchComponent } from '../components/search/search.component';
import { ITEMS_SERVICE } from '../services/items.service.contract';
import { SearchServiceImpl } from '../services/search.service';
import { SEARCH_SERVICE } from '../services/search.service.contract';
import { SETS_SERVICE } from '../services/sets.service.contract';

type pathType = 'sets' | 'items' | 'places';

@Component({
  selector: 'game-admin',
  imports: [
    TranslatePipe,
    ButtonDirective,
    RouterLink,
    SearchComponent,
    SearchCardComponent,
  ],
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
  readonly #setService = inject(SETS_SERVICE);
  readonly #itemService = inject(ITEMS_SERVICE);
  readonly #translateService = inject(TranslateService);
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

  protected async onClickDelete(type: pathType, id: string) {
    if (!window.confirm(this.#translateService.instant('ARE_YOU_SURE'))) {
      return;
    }

    if (type === 'items') {
      await this.#itemService.delete(id);
    } else if (type === 'sets') {
      await this.#setService.delete(id);
    }
    // else if (type === 'places') {
    // await this.#searchService.deletePlace?.(id);
    // }
    this.#searchService.search.set('');
  }
}
