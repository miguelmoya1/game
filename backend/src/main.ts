import { ClassSerializerInterceptor, Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);

  await app.listen({ port: configService.get<number>('PORT', 3000), host: '0.0.0.0' });

  const logLevels: LogLevel[] =
    configService.get('NODE_ENV') === 'development' ? ['debug', 'error', 'warn', 'log', 'verbose', 'fatal'] : ['error'];

  app.useLogger(logLevels);

  const logger = new Logger('bootstrap');

  logger.log(`Application: http://localhost:${configService.get('PORT') || 3000}/`);
}

bootstrap();
