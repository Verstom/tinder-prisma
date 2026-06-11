import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export const InteractionTypeDto = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE',
  SUPERLIKE: 'SUPERLIKE',
} as const;

export type InteractionTypeDto =
  (typeof InteractionTypeDto)[keyof typeof InteractionTypeDto];

export class CreateInteractionDto {
  @IsInt()
  @IsNotEmpty()
  fromUserId!: number;

  @IsInt()
  @IsNotEmpty()
  toUserId!: number;

  @IsEnum(InteractionTypeDto)
  @IsNotEmpty()
  type!: InteractionTypeDto;
}