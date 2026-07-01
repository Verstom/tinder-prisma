"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsServiceModule = void 0;
const common_1 = require("@nestjs/common");
const interactions_service_controller_1 = require("./interactions-service.controller");
const interactions_service_service_1 = require("./interactions-service.service");
const interactions_prisma_service_1 = require("./prisma/interactions-prisma.service");
let InteractionsServiceModule = class InteractionsServiceModule {
};
exports.InteractionsServiceModule = InteractionsServiceModule;
exports.InteractionsServiceModule = InteractionsServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [interactions_service_controller_1.InteractionsServiceController],
        providers: [interactions_service_service_1.InteractionsServiceService, interactions_prisma_service_1.InteractionsPrismaService],
        exports: [interactions_service_service_1.InteractionsServiceService, interactions_prisma_service_1.InteractionsPrismaService],
    })
], InteractionsServiceModule);
//# sourceMappingURL=interactions-service.module.js.map