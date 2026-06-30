import { Controller, Get } from '@nestjs/common';
import { InteractionsServiceService } from './interactions-service.service';

@Controller()
export class InteractionsServiceController {
  constructor(private readonly interactionsServiceService: InteractionsServiceService) {}

  @Get()
  getHello(): string {
    return this.interactionsServiceService.getHello();
  }
}
