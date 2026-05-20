import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { publicUserSelect } from '../../../shared/infrastructure/prisma/public-user.select';
import { normalizePublicUser } from '../../../shared/utils/normalize-public-user';
import { CreateInteractionDto } from '../../dto/create-interaction.dto';
import type { InteractionRecord } from '../../domain/entities/interaction-record';
import type { StoredInteraction } from '../../domain/repositories/interactions.repository';
import { InteractionsRepository } from '../../domain/repositories/interactions.repository';

@Injectable()
export class PrismaInteractionsRepository implements InteractionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(
    userId: number,
    createInteractionDto: CreateInteractionDto,
  ): Promise<StoredInteraction> {
    const interaction = await this.prisma.userInteraction.upsert({
      where: {
        fromUserId_toUserId: {
          fromUserId: userId,
          toUserId: createInteractionDto.targetUserId,
        },
      },
      create: {
        fromUserId: userId,
        toUserId: createInteractionDto.targetUserId,
        type: createInteractionDto.type,
      },
      update: {
        type: createInteractionDto.type,
      },
    });

    const targetUser = await this.prisma.user.findUnique({
      where: {
        id: interaction.toUserId,
      },
      select: publicUserSelect,
    });

    if (!targetUser) {
      throw new Error('Usuario destino no encontrado');
    }

    return {
      id: interaction.id,
      fromUserId: interaction.fromUserId,
      toUserId: interaction.toUserId,
      type: interaction.type,
      createdAt: interaction.createdAt,
      updatedAt: interaction.updatedAt,
      targetUser: normalizePublicUser(targetUser),
    };
  }

  async findReverseInteraction(
    fromUserId: number,
    toUserId: number,
  ): Promise<InteractionRecord | null> {
    const interaction = await this.prisma.userInteraction.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId,
        },
      },
    });

    if (!interaction) {
      return null;
    }

    const targetUser = await this.prisma.user.findUnique({
      where: {
        id: interaction.toUserId,
      },
      select: publicUserSelect,
    });

    if (!targetUser) {
      throw new Error('Usuario destino no encontrado');
    }

    return {
      id: interaction.id,
      fromUserId: interaction.fromUserId,
      toUserId: interaction.toUserId,
      type: interaction.type,
      createdAt: interaction.createdAt,
      updatedAt: interaction.updatedAt,
      targetUser: normalizePublicUser(targetUser),
    };
  }

  async findSentByUser(userId: number): Promise<InteractionRecord[]> {
    const interactions = await this.prisma.userInteraction.findMany({
      where: {
        fromUserId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const targetUserIds = interactions.map((interaction) => interaction.toUserId);

    const targetUsers = await this.prisma.user.findMany({
      where: {
        id: {
          in: targetUserIds,
        },
      },
      select: publicUserSelect,
    });

    return interactions.map((interaction) => {
      const targetUser = targetUsers.find(
        (user) => user.id === interaction.toUserId,
      );

      if (!targetUser) {
        throw new Error('Usuario destino no encontrado');
      }

      return {
        id: interaction.id,
        fromUserId: interaction.fromUserId,
        toUserId: interaction.toUserId,
        type: interaction.type,
        createdAt: interaction.createdAt,
        updatedAt: interaction.updatedAt,
        targetUser: normalizePublicUser(targetUser),
      };
    });
  }

  async countSentTypeSince(
    userId: number,
    type: 'LIKE' | 'DISLIKE' | 'SUPERLIKE',
    since: Date,
  ): Promise<number> {
    return await this.prisma.userInteraction.count({
      where: {
        fromUserId: userId,
        type,
        updatedAt: {
          gte: since,
        },
      },
    });
  }
}