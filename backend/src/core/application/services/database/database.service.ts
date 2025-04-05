import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service.contract';

@Injectable()
export class DatabaseServiceImpl
  extends PrismaClient
  implements DatabaseService
{
  async onModuleInit() {
    await this.$connect();
  }
}
