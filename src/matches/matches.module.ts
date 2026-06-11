import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchesPrismaService } from '../prisma/matches-prisma.service';

@Module({
  providers: [MatchesService, MatchesPrismaService],
  controllers: [MatchesController],
  exports: [MatchesService],
})
export class MatchesModule {}