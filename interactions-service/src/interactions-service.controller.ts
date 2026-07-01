import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InteractionsServiceService } from './interactions-service.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Controller('interactions')
export class InteractionsServiceController {
  constructor(private readonly interactionsService: InteractionsServiceService) {}

  @Post()
  create(@Body() dto: CreateInteractionDto) {
    return this.interactionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }

  @Get('sent/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.interactionsService.findByUser(userId);
  }

  @Get('received/:userId')
  findReceivedByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.interactionsService.findReceivedByUser(userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interactionsService.remove(id);
  }
}
