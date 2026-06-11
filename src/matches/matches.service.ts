import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchesPrismaService } from '../prisma/matches-prisma.service';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: MatchesPrismaService) {}

  async findAll() {
    return this.prisma.match.findMany();
  }

  async findOne(id: number) {
    const match = await this.prisma.match.findUnique({
      where: { id },
    });

    if (!match) {
      throw new NotFoundException('Match no encontrado');
    }

    return match;
  }

  async create(user1Id: number, user2Id: number) {
    const existingMatch = await this.prisma.match.findFirst({
      where: {
        OR: [
          {
            user1Id,
            user2Id,
          },
          {
            user1Id: user2Id,
            user2Id: user1Id,
          },
        ],
      },
    });

    if (existingMatch) {
      return existingMatch;
    }

    return this.prisma.match.create({
      data: {
        user1Id,
        user2Id,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.match.delete({
      where: { id },
    });
  }
}