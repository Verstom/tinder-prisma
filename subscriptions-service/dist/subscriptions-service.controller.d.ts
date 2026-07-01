import { SubscriptionsServiceService } from './subscriptions-service.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-plan.dto';
export declare class SubscriptionsServiceController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsServiceService);
    /** Devuelve los planes disponibles (FREE, GOLD, PREMIUM) */
    getPlans(): {
        name: string;
        price: number;
        features: string[];
    }[];
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
}
