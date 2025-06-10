import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EffectsFormComponent } from '@game/features/effects';
import { PlaceCategory } from '@game/features/places';
import { SET_SERVICE } from '@game/features/sets';
import { Rank, TranslatePipe } from '@game/shared';
import { ItemType } from '../../enums/item.enum';

// TODO: fix this
@Component({
  selector: 'lib-item-form',
  imports: [
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    EffectsFormComponent,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  readonly #setService = inject(SET_SERVICE);

  readonly itemForm = input.required<FormGroup>();

  readonly setsOptions = this.#setService.all;

  protected readonly itemTypes = Object.values(ItemType);
  protected readonly ranks = Object.values(Rank);
  protected readonly spawnCategoriesOptions = Object.values(PlaceCategory);

  get name() {
    return this.itemForm().get('name') as FormControl;
  }

  get description() {
    return this.itemForm().get('description') as FormControl;
  }

  get itemType() {
    return this.itemForm().get('itemType') as FormControl;
  }

  get imageUrl() {
    return this.itemForm().get('imageUrl') as FormControl;
  }

  get rank() {
    return this.itemForm().get('rank') as FormControl;
  }

  get spawnCategories() {
    return this.itemForm().get('spawnCategories') as FormControl;
  }

  get setId() {
    return this.itemForm().get('setId') as FormControl;
  }

  get effectsArray() {
    return this.itemForm().get('effects') as FormArray;
  }
}
