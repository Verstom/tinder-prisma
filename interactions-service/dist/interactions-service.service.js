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
exports.InteractionsServiceService = void 0;
const common_1 = require("@nestjs/common");
const interactions_prisma_service_1 = require("./prisma/interactions-prisma.service");
let InteractionsServiceService = class InteractionsServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.userInteraction.findMany();
    }
    async findByUser(userId) {
        return this.prisma.userInteraction.findMany({
            where: {
                fromUserId: userId,
            },
        });
    }
    async findReceivedByUser(userId) {
        return this.prisma.userInteraction.findMany({
            where: {
                toUserId: userId,
            },
        });
    }
    async create(dto) {
        return this.prisma.userInteraction.create({
            data: {
                fromUserId: dto.fromUserId,
                toUserId: dto.toUserId,
                type: dto.type,
            },
        });
    }
    async remove(id) {
        const existing = await this.prisma.userInteraction.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Interacción no encontrada');
        }
        return this.prisma.userInteraction.delete({
            where: { id },
        });
    }
};
exports.InteractionsServiceService = InteractionsServiceService;
exports.InteractionsServiceService = InteractionsServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [interactions_prisma_service_1.InteractionsPrismaService])
], InteractionsServiceService);
//# sourceMappingURL=interactions-service.service.js.map