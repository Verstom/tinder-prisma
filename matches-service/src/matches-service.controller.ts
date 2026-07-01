import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MatchesServiceService } from './matches-service.service';

@Controller('matches')
export class MatchesServiceController {
  constructor(private readonly matchesService: MatchesServiceService) {}

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.matchesService.findByUser(userId);
  }

  @Post()
  create(
    @Body('user1Id', ParseIntPipe) user1Id: number,
    @Body('user2Id', ParseIntPipe) user2Id: number,
  ) {
    return this.matchesService.create(user1Id, user2Id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.remove(id);
  }
}
