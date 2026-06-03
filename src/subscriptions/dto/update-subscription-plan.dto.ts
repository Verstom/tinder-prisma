import { IsIn, IsNotEmpty } from 'class-validator';
import type { SubscriptionPlan } from '../domain/entities/subscription-plan';

export class UpdateSubscriptionPlanDto {
  @IsNotEmpty()
  @IsIn(['FREE', 'GOLD', 'PREMIUM'])
  plan!: SubscriptionPlan;
}