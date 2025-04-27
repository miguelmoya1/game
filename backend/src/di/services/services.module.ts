import { Global, Module } from '@nestjs/common';
import { databaseServiceProvider } from './impl/database.service.provider';
import { emailServiceProvider } from './impl/email.service.provider';
import { encryptionServiceProvider } from './impl/encryption.service.provider';
import { errorHandlerServiceProvider } from './impl/error-handler.service.provider';
import { permissionsServiceProvider } from './impl/permission.service.provider';
import { translateServiceProvider } from './impl/translate.service.provider';

const services = [
  errorHandlerServiceProvider,
  permissionsServiceProvider,
  encryptionServiceProvider,
  translateServiceProvider,
  databaseServiceProvider,
  emailServiceProvider,
];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
