import { SubscriptionsPrismaService } from './prisma/subscriptions-prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-plan.dto';
export declare class SubscriptionsServiceService {
    private readonly prisma;
    constructor(prisma: SubscriptionsPrismaService);
    create(dto: CreateSubscriptionDto): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findByUser(userId: number): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    update(id: number, dto: UpdateSubscriptionDto): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        userId: number;
        plan: import("../../src/generated/subscriptions").$Enums.SubscriptionPlan;
        endsAt: Date | null;
        status: import("../../src/generated/subscriptions").$Enums.SubscriptionStatus;
        startedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    /**
     * Devuelve los planes disponibles con precios y características
     * (datos estáticos, sin persistencia)
     */
    getPlans(): {
        name: string;
        price: number;
        features: string[];
    }[];
}
