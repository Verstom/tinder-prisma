import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { publicUserSelect } from '../../../shared/infrastructure/prisma/public-user.select';
import { normalizePublicUser } from '../../../shared/utils/normalize-public-user';
import type { MatchSummary } from '../../domain/entities/match-summary';
import type { EnsuredMatch } from '../../domain/repositories/matches.repository';
import { MatchesRepository } from '../../domain/repositories/matches.repository';

@Injectable()
export class PrismaMatchesRepository implements MatchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildMatchPair(userAId: number, userBId: number): {
    user1Id: number;
    user2Id: number;
  } {
    return {
      user1Id: Math.min(userAId, userBId),
      user2Id: Math.max(userAId, userBId),
    };
  }

  async ensurePair(userAId: number, userBId: number): Promise<EnsuredMatch> {
    const pair = this.buildMatchPair(userAId, userBId);

    const match = await this.prisma.match.upsert({
      where: {
        user1Id_user2Id: pair,
      },
      create: pair,
      update: {},
    });

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: [match.user1Id, match.user2Id],
        },
      },
      select: publicUserSelect,
    });

    const firstUser = users.find((user) => user.id === match.user1Id);
    const secondUser = users.find((user) => user.id === match.user2Id);

    if (!firstUser || !secondUser) {
      throw new Error('Usuarios del match no encontrados');
    }

    return {
      ...match,
      firstUser: normalizePublicUser(firstUser),
      secondUser: normalizePublicUser(secondUser),
    };
  }

  async findByUser(userId: number): Promise<MatchSummary[]> {
    const matches = await this.prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const userIds = matches.flatMap((match) => [match.user1Id, match.user2Id]);

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: publicUserSelect,
    });

    return matches.map((match) => {
      const matchedUserId =
        match.user1Id === userId ? match.user2Id : match.user1Id;

      const matchedUser = users.find((user) => user.id === matchedUserId);

      if (!matchedUser) {
        throw new Error('Usuario del match no encontrado');
      }

      return {
        id: match.id,
        createdAt: match.createdAt,
        matchedUser: normalizePublicUser(matchedUser),
      };
    });
  }

  async findAccessibleById(
    matchId: number,
    userId: number,
  ): Promise<EnsuredMatch | null> {
    const match = await this.prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!match) {
      return null;
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: [match.user1Id, match.user2Id],
        },
      },
      select: publicUserSelect,
    });

    const firstUser = users.find((user) => user.id === match.user1Id);
    const secondUser = users.find((user) => user.id === match.user2Id);

    if (!firstUser || !secondUser) {
      throw new Error('Usuarios del match no encontrados');
    }

    return {
      ...match,
      firstUser: normalizePublicUser(firstUser),
      secondUser: normalizePublicUser(secondUser),
    };
  }
}