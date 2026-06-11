import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/messages';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class MessagesPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString =
      process.env.MESSAGES_DATABASE_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('MESSAGES_DATABASE_URL no está definida en el .env');
    }

    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}