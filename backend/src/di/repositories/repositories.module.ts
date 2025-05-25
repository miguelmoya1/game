import { Module } from '@nestjs/common';
import { ServicesModule } from '../services';
import { accountRepositoryProvider } from './impl/account.repository.provider';
import { dungeonRepositoryProvider } from './impl/dungeon.repository.provider';
import { itemRepositoryProvider } from './impl/item.repository.provider';
import { partyRepositoryProvider } from './impl/party.repository.provider';
import { placeApiHistoryRepositoryProvider } from './impl/place-api-history.repository.provider';
import { placeApiRepositoryProvider } from './impl/place-api.repository.provider';
import { placeRepositoryProvider } from './impl/place.repository.provider';
import { playerItemCollectionLogRepositoryProvider } from './impl/player-item-collection-log.repository.provider';
import { playerItemRepositoryProvider } from './impl/player-item.repository.provider';
import { playerRepositoryProvider } from './impl/player.repository.provider';
import { redisRepositoryProvider } from './impl/redis.provider';
import { setRepositoryProvider } from './impl/set.repository.provider';
import { userRepositoryProvider } from './impl/user.repository.provider';

const repositories = [
  playerItemCollectionLogRepositoryProvider,
  placeApiHistoryRepositoryProvider,
  placeApiRepositoryProvider,
  accountRepositoryProvider,
  placeRepositoryProvider,
  userRepositoryProvider,
  itemRepositoryProvider,
  playerRepositoryProvider,
  playerItemRepositoryProvider,
  setRepositoryProvider,
  redisRepositoryProvider,
  partyRepositoryProvider,
  dungeonRepositoryProvider,
];

@Module({
  imports: [ServicesModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
