import { Module } from '@nestjs/common';
import { InteractionsServiceController } from './interactions-service.controller';
import { InteractionsServiceService } from './interactions-service.service';
import { InteractionsPrismaService } from './prisma/interactions-prisma.service';

@Module({
  imports: [],
  controllers: [InteractionsServiceController],
  providers: [InteractionsServiceService, InteractionsPrismaService],
  exports: [InteractionsServiceService, InteractionsPrismaService],
})
export class InteractionsServiceModule {}
