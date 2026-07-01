import { Module } from '@nestjs/common';
import { MessagesServiceController } from './messages-service.controller';
import { MessagesServiceService } from './messages-service.service';
import { MessagesPrismaService } from './prisma/messages-prisma.service';

@Module({
  imports: [],
  controllers: [MessagesServiceController],
  providers: [MessagesServiceService, MessagesPrismaService],
  exports: [MessagesServiceService, MessagesPrismaService],
})
export class MessagesServiceModule {}
