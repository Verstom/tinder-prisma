import { InteractionsServiceService } from './interactions-service.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
export declare class InteractionsServiceController {
    private readonly interactionsService;
    constructor(interactionsService: InteractionsServiceService);
    create(dto: CreateInteractionDto): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    remove(id: number): Promise<{
        fromUserId: number;
        toUserId: number;
        type: import("../../src/generated/interactions").$Enums.InteractionType;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
