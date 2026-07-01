import { UsersServiceService } from './users-service.service';
import { CreateUserDto } from './dto/create-user.dto';
type UpdateUserDto = Partial<CreateUserDto>;
export declare class UsersServiceController {
    private readonly usersService;
    constructor(usersService: UsersServiceService);
    create(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        plan: import("../../src/generated/users").$Enums.UserPlan;
        age: number | null;
        bio: string | null;
        interests: string[];
        location: string | null;
        photos: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        password: string;
        plan: import("../../src/generated/users").$Enums.UserPlan;
        age: number | null;
        bio: string | null;
        interests: string[];
        location: string | null;
        photos: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        plan: import("../../src/generated/users").$Enums.UserPlan;
        age: number | null;
        bio: string | null;
        interests: string[];
        location: string | null;
        photos: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        plan: import("../../src/generated/users").$Enums.UserPlan;
        age: number | null;
        bio: string | null;
        interests: string[];
        location: string | null;
        photos: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        plan: import("../../src/generated/users").$Enums.UserPlan;
        age: number | null;
        bio: string | null;
        interests: string[];
        location: string | null;
        photos: string[];
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
export {};
