export declare const InteractionTypeDto: {
    readonly LIKE: "LIKE";
    readonly DISLIKE: "DISLIKE";
    readonly SUPERLIKE: "SUPERLIKE";
};
export type InteractionTypeDto = (typeof InteractionTypeDto)[keyof typeof InteractionTypeDto];
export declare class CreateInteractionDto {
    fromUserId: number;
    toUserId: number;
    type: InteractionTypeDto;
}
