export declare enum SubscriptionPlan {
    FREE = "FREE",
    PREMIUM = "PREMIUM",
    GOLD = "GOLD"
}
export declare class CreateSubscriptionDto {
    userId: number;
    plan: SubscriptionPlan;
    endsAt?: string;
}
