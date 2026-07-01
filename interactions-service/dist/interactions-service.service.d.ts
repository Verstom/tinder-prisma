import { InteractionsPrismaService } from './prisma/interactions-prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
export declare class InteractionsServiceService {
    private readonly prisma;
    constructor(prisma: InteractionsPrismaService);
    findAll(): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByUser(userId: number): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findReceivedByUser(userId: number): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateInteractionDto): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
