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
exports.MessagesPrismaService = void 0;
const common_1 = require("@nestjs/common");
const messages_1 = require("../../../src/generated/messages");
const adapter_pg_1 = require("@prisma/adapter-pg");
let MessagesPrismaService = class MessagesPrismaService extends messages_1.PrismaClient {
    constructor() {
        const connectionString = process.env.MESSAGES_DATABASE_URL || process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('MESSAGES_DATABASE_URL/DATABASE_URL no está definida en el .env');
        }
        const adapter = new adapter_pg_1.PrismaPg({ connectionString });
        super({
            adapter,
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.MessagesPrismaService = MessagesPrismaService;
exports.MessagesPrismaService = MessagesPrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessagesPrismaService);
//# sourceMappingURL=messages-prisma.service.js.map