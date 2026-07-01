import { Module } from '@nestjs/common';
import { SubscriptionsServiceController } from './subscriptions-service.controller';
import { SubscriptionsServiceService } from './subscriptions-service.service';
import { SubscriptionsPrismaService } from './prisma/subscriptions-prisma.service';

@Module({
  imports: [],
  controllers: [SubscriptionsServiceController],
  providers: [SubscriptionsServiceService, SubscriptionsPrismaService],
  exports: [SubscriptionsServiceService, SubscriptionsPrismaService],
})
export class SubscriptionsServiceModule {}
