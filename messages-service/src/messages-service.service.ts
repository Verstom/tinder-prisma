import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesPrismaService } from './prisma/messages-prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesServiceService {
  constructor(private readonly prisma: MessagesPrismaService) {}

  async create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        matchId: dto.matchId,
        senderId: dto.senderId,
        content: dto.content,
      },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: number) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Mensaje no encontrado');
    }

    return message;
  }

  async findByMatch(matchId: number) {
    return this.prisma.message.findMany({
      where: { matchId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findBySender(senderId: number) {
    return this.prisma.message.findMany({
      where: { senderId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
