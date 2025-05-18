import { Provider } from '@nestjs/common';
import {
  PARTY_REPOSITORY,
  PartyRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const partyRepositoryProvider: Provider = {
  provide: PARTY_REPOSITORY,
  useClass: PartyRepositoryImpl,
};
