import { Module } from '@nestjs/common';
import { InteractionsServiceController } from './interactions-service.controller';
import { InteractionsServiceService } from './interactions-service.service';

@Module({
  imports: [],
  controllers: [InteractionsServiceController],
  providers: [InteractionsServiceService],
})
export class InteractionsServiceModule {}
