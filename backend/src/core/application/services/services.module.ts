import { Global, Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EncryptionService } from './encryption/encryption.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { TranslateExtractorService } from './translate/translate-extractor.service';
import { TranslateFilesService } from './translate/translate-files.service';
import { TranslateService } from './translate/translate.service';

const services = [ErrorHandlerService, EncryptionService, TranslateService, EmailService];

@Global()
@Module({
  providers: [...services, TranslateExtractorService, TranslateFilesService],
  exports: [...services],
})
export class ServicesModule {}
