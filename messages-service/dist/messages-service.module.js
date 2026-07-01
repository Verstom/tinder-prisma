"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesServiceModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_controller_1 = require("./messages-service.controller");
const messages_service_service_1 = require("./messages-service.service");
const messages_prisma_service_1 = require("./prisma/messages-prisma.service");
let MessagesServiceModule = class MessagesServiceModule {
};
exports.MessagesServiceModule = MessagesServiceModule;
exports.MessagesServiceModule = MessagesServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [messages_service_controller_1.MessagesServiceController],
        providers: [messages_service_service_1.MessagesServiceService, messages_prisma_service_1.MessagesPrismaService],
        exports: [messages_service_service_1.MessagesServiceService, messages_prisma_service_1.MessagesPrismaService],
    })
], MessagesServiceModule);
//# sourceMappingURL=messages-service.module.js.map