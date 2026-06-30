import { Controller, Get } from '@nestjs/common';
import { SubscriptionsServiceService } from './subscriptions-service.service';

@Controller()
export class SubscriptionsServiceController {
  constructor(private readonly subscriptionsServiceService: SubscriptionsServiceService) {}

  @Get()
  getHello(): string {
    return this.subscriptionsServiceService.getHello();
  }
}
