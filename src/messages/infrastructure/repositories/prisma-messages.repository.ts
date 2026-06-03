import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { publicUserSelect } from '../../../shared/infrastructure/prisma/public-user.select';
import { normalizePublicUser } from '../../../shared/utils/normalize-public-user';
import { CreateMessageDto } from '../../dto/create-message.dto';
import type { Message } from '../../domain/entities/message';
import { MessagesRepository } from '../../domain/repositories/messages.repository';

@Injectable()
export class PrismaMessagesRepository implements MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get messageDelegate(): PrismaService['message'] {
    return this.prisma.message;
  }

  async create(
    senderId: number,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const message = await this.messageDelegate.create({
      data: {
        matchId: createMessageDto.matchId,
        senderId,
        content: createMessageDto.content,
      },
    });

    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: publicUserSelect,
    });

    if (!sender) {
      throw new NotFoundException('Usuario emisor no encontrado');
    }

    return {
      id: message.id,
      matchId: message.matchId,
      senderId: message.senderId,
      content: message.content,
      createdAt: message.createdAt,
      sender: normalizePublicUser(sender),
    };
  }

  async findByMatchId(matchId: number): Promise<Message[]> {
    const messages = await this.messageDelegate.findMany({
      where: { matchId },
      orderBy: { createdAt: 'asc' },
    });

    const senderIds = [...new Set(messages.map((message) => message.senderId))];

    const senders = await this.prisma.user.findMany({
      where: {
        id: {
          in: senderIds,
        },
      },
      select: publicUserSelect,
    });

    const senderMap = new Map(
      senders.map((sender) => [sender.id, normalizePublicUser(sender)]),
    );

    return messages.map((message) => {
      const sender = senderMap.get(message.senderId);

      if (!sender) {
        throw new NotFoundException('Usuario emisor no encontrado');
      }

      return {
        id: message.id,
        matchId: message.matchId,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
        sender,
      };
    });
  }
}