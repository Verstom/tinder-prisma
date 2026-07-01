"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsServiceService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_prisma_service_1 = require("./prisma/subscriptions-prisma.service");
let SubscriptionsServiceService = class SubscriptionsServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
        const sub = await this.prisma.subscription.findUnique({
            where: { id },
        });
        if (!sub) {
            throw new common_1.NotFoundException('Suscripción no encontrada');
        }
        return sub;
    }
    async findByUser(userId) {
        return this.prisma.subscription.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.subscription.update({
            where: { id },
            data: {
                ...(dto.plan && { plan: dto.plan }),
                ...(dto.endsAt && { endsAt: new Date(dto.endsAt) }),
            },
        });
    }
    async remove(id) {
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
};
exports.SubscriptionsServiceService = SubscriptionsServiceService;
exports.SubscriptionsServiceService = SubscriptionsServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscriptions_prisma_service_1.SubscriptionsPrismaService])
], SubscriptionsServiceService);
//# sourceMappingURL=subscriptions-service.service.js.map