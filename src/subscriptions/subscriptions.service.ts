import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-plan.dto';

@Injectable()
export class SubscriptionsService {
  private subscriptions: any[] = [];

  create(dto: CreateSubscriptionDto) {
    const newSub = { ...dto, id: this.subscriptions.length + 1 };
    this.subscriptions.push(newSub);
    return newSub;
  }

  update(id: number, dto: UpdateSubscriptionDto) {
    const sub = this.subscriptions.find(s => s.id === id);
    if (!sub) throw new NotFoundException('Suscripción no encontrada');

    sub.planName = dto.planName ?? sub.planName;
    return { message: 'Suscripción actualizada', subscription: sub };
  }

  findAll() {
    return this.subscriptions;
  }

  findOne(id: number) {
    const sub = this.subscriptions.find(s => s.id === id);
    if (!sub) throw new NotFoundException('Suscripción no encontrada');
    return sub;
  }

  remove(id: number) {
    const index = this.subscriptions.findIndex(s => s.id === id);
    if (index === -1) throw new NotFoundException('Suscripción no encontrada');

    const deleted = this.subscriptions.splice(index, 1)[0];
    return { message: 'Suscripción eliminada', subscription: deleted };
  }
}