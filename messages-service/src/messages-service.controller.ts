import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MessagesServiceService } from './messages-service.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesServiceController {
  constructor(private readonly messagesService: MessagesServiceService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Get('match/:matchId')
  findByMatch(@Param('matchId', ParseIntPipe) matchId: number) {
    return this.messagesService.findByMatch(matchId);
  }

  @Get('sender/:senderId')
  findBySender(@Param('senderId', ParseIntPipe) senderId: number) {
    return this.messagesService.findBySender(senderId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
