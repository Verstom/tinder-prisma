import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesPrismaService } from '../prisma/messages-prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesPrismaService],
  exports: [MessagesService],
})
export class MessagesModule {}