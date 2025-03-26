// src/index.ts
import { fastifyCookie } from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import { fastifyCsrfProtection } from '@fastify/csrf-protection';
import { fastifyJwt } from '@fastify/jwt';
import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { addProviders } from './di/di-manager.ts';
import { FASTIFY } from './di/fastify.provider.ts';
import { accountRepositoryProvider } from './di/repositories/account.repository.provider.ts';
import { placesApiRepositoryProvider } from './di/repositories/places-api.repository.provider.ts';
import { userRepositoryProvider } from './di/repositories/user.repository.provider.ts';
import { databaseServiceProvider } from './di/services/database.service.provider.ts';
import { emailServiceProvider } from './di/services/email.service.provider.ts';
import { encryptionServiceProvider } from './di/services/encryption.service.provider.ts';
import { translateServiceProvider } from './di/services/translate.service.provider.ts';
import { accountUseCaseProvider } from './di/use-cases/account.use-case.provider.ts';
import { userUseCaseProvider } from './di/use-cases/user.use-case.provider.ts';
import { AuthController } from './presentation/controllers/auth/auth.controller.ts';
import { TranslateController } from './presentation/controllers/translate/translate.controller.ts';
import { UserController } from './presentation/controllers/users/users.controller.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const fastify: FastifyInstance = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'silent' : 'debug',
    customLevels: {
      error: 45,
      debug: 35,
      info: 30,
      warn: 25,
    },
    transport: {
      target: 'pino-pretty',
      options: {
        levelFirst: true,
        ignore: 'pid,hostname,time',
      },
    },
  },
});

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET ?? 'extremely-secret-cookie-secret-12345654321',
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? 'extremely-secret-jwt-secret-12345654321',
  cookie: {
    cookieName: 'auth-token',
    signed: true,
  },
});

fastify.register(fastifyCsrfProtection, {
  cookieOpts: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  },
});

async function main() {
  await addProviders([
    {
      provide: FASTIFY,
      useValue: fastify,
    },
    databaseServiceProvider,
    translateServiceProvider,
    emailServiceProvider,
    encryptionServiceProvider,

    accountRepositoryProvider,
    placesApiRepositoryProvider,
    userRepositoryProvider,

    accountUseCaseProvider,
    userUseCaseProvider,
  ]);

  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  new TranslateController();
  new UserController();
  new AuthController();

  fastify.setErrorHandler((error, _, reply) => {
    console.error(error);
    reply.status(500).send({ message: 'Internal Server Error' });
  });

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
}
