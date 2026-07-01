import { MatchesServiceService } from './matches-service.service';
export declare class MatchesServiceController {
    private readonly matchesService;
    constructor(matchesService: MatchesServiceService);
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
    findByUser(userId: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }[]>;
    create(user1Id: number, user2Id: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        user1Id: number;
        user2Id: number;
        createdAt: Date;
    }>;
}
