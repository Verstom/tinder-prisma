import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../src/generated/matches';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class MatchesPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString =
      process.env.MATCHES_DATABASE_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('MATCHES_DATABASE_URL/DATABASE_URL no está definida en el .env');
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
