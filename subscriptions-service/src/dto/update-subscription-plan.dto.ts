import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { SubscriptionPlan } from './create-subscription.dto';

export class UpdateSubscriptionDto {
  @IsEnum(SubscriptionPlan)
  @IsOptional()
  plan?: SubscriptionPlan;

  @IsDateString()
  @IsOptional()
  endsAt?: string;
}
