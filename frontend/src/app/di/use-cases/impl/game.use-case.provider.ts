import { GameUseCaseImpl } from '@game/use-cases';
import { GAME_USE_CASE } from '@game/use-cases-contracts';

export const gameUseCaseProvider = {
  provide: GAME_USE_CASE,
  useClass: GameUseCaseImpl,
};
