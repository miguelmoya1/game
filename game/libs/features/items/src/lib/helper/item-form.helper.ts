import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rank } from '@game/core';
import { PlaceCategory } from '@game/features/places';
import { ItemType } from '../enums/item.enum';

export const getEmptyItemForm = () =>
  new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    itemType: new FormControl<ItemType>(ItemType.EQUIPPABLE, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
    }),
    effects: new FormArray([]),
    rank: new FormControl<Rank | undefined>(undefined, {
      nonNullable: true,
    }),
    spawnCategories: new FormControl<PlaceCategory[]>([], {
      nonNullable: true,
    }),
    setId: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
  });
