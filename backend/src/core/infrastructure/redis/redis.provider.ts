import { Logger } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),

  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
};

export const redisFactory = () => {
  const logger = new Logger('RedisFactory');
  const client = new Redis(redisOptions);
  client.on('error', (err) => {
    logger.error('Redis connection error:', err);
  });
  client.on('connect', () => {
    logger.log('Successfully connected to Redis.');
  });
  client.on('ready', () => {
    logger.log('Redis client is ready to use.');
  });
  return client;
};
