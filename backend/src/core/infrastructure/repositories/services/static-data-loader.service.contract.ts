export enum STATIC_DATA {
  items = 'static:items',
  sets = 'static:sets',
  spells = 'static:spells',
  races = 'static:races',
}

export interface StaticDataLoader {
  saveAndRefresh(value: unknown, type: STATIC_DATA): Promise<void>;
}

export const STATIC_DATA_LOADER = Symbol('STATIC_DATA_LOADER');
