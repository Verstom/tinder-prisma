import { Injectable, NotFoundException } from '@nestjs/common';
import { InteractionsPrismaService } from '../prisma/interactions-prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private readonly prisma: InteractionsPrismaService) {}

  async findAll() {
    return this.prisma.userInteraction.findMany();
  }

  async findByUser(userId: number) {
    return this.prisma.userInteraction.findMany({
      where: {
        fromUserId: userId,
      },
    });
  }

  async findReceivedByUser(userId: number) {
    return this.prisma.userInteraction.findMany({
      where: {
        toUserId: userId,
      },
    });
  }

  async create(dto: CreateInteractionDto) {
    return this.prisma.userInteraction.create({
      data: {
        fromUserId: dto.fromUserId,
        toUserId: dto.toUserId,
        type: dto.type,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.userInteraction.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Interacción no encontrada');
    }

    return this.prisma.userInteraction.delete({
      where: { id },
    });
  }
}