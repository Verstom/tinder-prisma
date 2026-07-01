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
exports.MessagesServiceService = void 0;
const common_1 = require("@nestjs/common");
const messages_prisma_service_1 = require("./prisma/messages-prisma.service");
let MessagesServiceService = class MessagesServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.message.create({
            data: {
                matchId: dto.matchId,
                senderId: dto.senderId,
                content: dto.content,
            },
        });
    }
    async findAll() {
        return this.prisma.message.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const message = await this.prisma.message.findUnique({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException('Mensaje no encontrado');
        }
        return message;
    }
    async findByMatch(matchId) {
        return this.prisma.message.findMany({
            where: { matchId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findBySender(senderId) {
        return this.prisma.message.findMany({
            where: { senderId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.message.delete({
            where: { id },
        });
    }
};
exports.MessagesServiceService = MessagesServiceService;
exports.MessagesServiceService = MessagesServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [messages_prisma_service_1.MessagesPrismaService])
], MessagesServiceService);
//# sourceMappingURL=messages-service.service.js.map