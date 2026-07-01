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
exports.MatchesServiceService = void 0;
const common_1 = require("@nestjs/common");
const matches_prisma_service_1 = require("./prisma/matches-prisma.service");
let MatchesServiceService = class MatchesServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.match.findMany();
    }
    async findOne(id) {
        const match = await this.prisma.match.findUnique({
            where: { id },
        });
        if (!match) {
            throw new common_1.NotFoundException('Match no encontrado');
        }
        return match;
    }
    async create(user1Id, user2Id) {
        const existingMatch = await this.prisma.match.findFirst({
            where: {
                OR: [
                    {
                        user1Id,
                        user2Id,
                    },
                    {
                        user1Id: user2Id,
                        user2Id: user1Id,
                    },
                ],
            },
        });
        if (existingMatch) {
            return existingMatch;
        }
        return this.prisma.match.create({
            data: {
                user1Id,
                user2Id,
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.match.findMany({
            where: {
                OR: [
                    { user1Id: userId },
                    { user2Id: userId },
                ],
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.match.delete({
            where: { id },
        });
    }
};
exports.MatchesServiceService = MatchesServiceService;
exports.MatchesServiceService = MatchesServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [matches_prisma_service_1.MatchesPrismaService])
], MatchesServiceService);
//# sourceMappingURL=matches-service.service.js.map