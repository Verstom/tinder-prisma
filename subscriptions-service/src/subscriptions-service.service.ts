import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsPrismaService } from './prisma/subscriptions-prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-plan.dto';

@Injectable()
export class SubscriptionsServiceService {
  constructor(private readonly prisma: SubscriptionsPrismaService) {}

  async create(dto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        userId: dto.userId,
        plan: dto.plan,
        endsAt: dto.endsAt ? new Date(dto.endsAt) : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!sub) {
      throw new NotFoundException('Suscripción no encontrada');
    }

    return sub;
  }

  async findByUser(userId: number) {
    return this.prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    await this.findOne(id);

    return this.prisma.subscription.update({
      where: { id },
      data: {
        ...(dto.plan && { plan: dto.plan }),
        ...(dto.endsAt && { endsAt: new Date(dto.endsAt) }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.subscription.delete({
      where: { id },
    });
  }

  /**
   * Devuelve los planes disponibles con precios y características
   * (datos estáticos, sin persistencia)
   */
  getPlans() {
    return [
      {
        name: 'FREE',
        price: 0,
        features: [
          '10 likes por día',
          'Sin superlikes',
          'Perfil básico',
        ],
      },
      {
        name: 'GOLD',
        price: 9.99,
        features: [
          'Likes ilimitados',
          '5 superlikes por día',
          'Perfil destacado',
        ],
      },
      {
        name: 'PREMIUM',
        price: 19.99,
        features: [
          'Todo ilimitado',
          'Superlikes ilimitados',
          'Perfil VIP',
          'Soporte prioritario',
        ],
      },
    ];
  }
}
