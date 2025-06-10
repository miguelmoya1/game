import { Provider } from '@nestjs/common';
import { REDIS_CLIENT, redisFactory } from '../../../core/infrastructure/redis/redis.provider';

export const redisRepositoryProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: redisFactory,
};
