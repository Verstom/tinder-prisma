import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { InteractionsPrismaService } from '../prisma/interactions-prisma.service';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService, InteractionsPrismaService],
  exports: [InteractionsService],
})
export class InteractionsModule {}