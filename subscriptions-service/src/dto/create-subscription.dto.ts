import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export enum SubscriptionPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  GOLD = 'GOLD',
}

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsEnum(SubscriptionPlan)
  @IsNotEmpty()
  plan!: SubscriptionPlan;

  @IsDateString()
  @IsOptional()
  endsAt?: string;
}
