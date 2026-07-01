import { Module } from '@nestjs/common';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';
import { MatchesPrismaService } from './prisma/matches-prisma.service';

@Module({
  imports: [],
  controllers: [MatchesServiceController],
  providers: [MatchesServiceService, MatchesPrismaService],
  exports: [MatchesServiceService, MatchesPrismaService],
})
export class MatchesServiceModule {}
