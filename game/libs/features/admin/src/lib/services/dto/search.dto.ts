export type SearchDto = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
};

export type SearchResponseDto = {
  readonly items: SearchDto[];
  readonly places: SearchDto[];
  readonly sets: SearchDto[];
};
