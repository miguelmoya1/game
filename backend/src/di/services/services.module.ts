import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { aggregatedStatsServiceProvider } from './impl/aggregated-stats.service.provider';
import { databaseServiceProvider } from './impl/database.service.provider';
import { emailServiceProvider } from './impl/email.service.provider';
import { encryptionServiceProvider } from './impl/encryption.service.provider';
import { permissionsServiceProvider } from './impl/permission.service.provider';
import { translateServiceProvider } from './impl/translate.service.provider';

const services = [
  permissionsServiceProvider,
  encryptionServiceProvider,
  translateServiceProvider,
  databaseServiceProvider,
  emailServiceProvider,
  aggregatedStatsServiceProvider,
];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '90d' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
    }),
  ],
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
