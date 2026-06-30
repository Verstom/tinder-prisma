import { Module } from '@nestjs/common';
import { SubscriptionsServiceController } from './subscriptions-service.controller';
import { SubscriptionsServiceService } from './subscriptions-service.service';

@Module({
  imports: [],
  controllers: [SubscriptionsServiceController],
  providers: [SubscriptionsServiceService],
})
export class SubscriptionsServiceModule {}
