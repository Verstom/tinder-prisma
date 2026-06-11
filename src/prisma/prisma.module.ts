import { Module } from '@nestjs/common';
import { UsersPrismaService } from './users-prisma.service';
import { MatchesPrismaService } from './matches-prisma.service';
import { MessagesPrismaService } from './messages-prisma.service';
import { InteractionsPrismaService } from './interactions-prisma.service';
import { SubscriptionsPrismaService } from './subscriptions-prisma.service';

@Module({
  providers: [
    UsersPrismaService,
    MatchesPrismaService,
    MessagesPrismaService,
    InteractionsPrismaService,
    SubscriptionsPrismaService,
  ],
  exports: [
    UsersPrismaService,
    MatchesPrismaService,
    MessagesPrismaService,
    InteractionsPrismaService,
    SubscriptionsPrismaService,
  ],
})
export class PrismaModule {}