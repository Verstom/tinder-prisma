import { MatchesPrismaService } from './prisma/matches-prisma.service';
export declare class MatchesServiceService {
    private readonly prisma;
    constructor(prisma: MatchesPrismaService);
    findAll(): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }>;
    create(user1Id: number, user2Id: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }>;
    findByUser(userId: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }>;
}
