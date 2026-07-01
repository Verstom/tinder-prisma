import { MessagesServiceService } from './messages-service.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesServiceController {
    private readonly messagesService;
    constructor(messagesService: MessagesServiceService);
    create(dto: CreateMessageDto): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }>;
    findByMatch(matchId: number): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }[]>;
    findBySender(senderId: number): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }[]>;
    remove(id: number): Promise<{
        matchId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        id: number;
    }>;
}
