"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsServiceModule = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_controller_1 = require("./subscriptions-service.controller");
const subscriptions_service_service_1 = require("./subscriptions-service.service");
const subscriptions_prisma_service_1 = require("./prisma/subscriptions-prisma.service");
let SubscriptionsServiceModule = class SubscriptionsServiceModule {
};
exports.SubscriptionsServiceModule = SubscriptionsServiceModule;
exports.SubscriptionsServiceModule = SubscriptionsServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [subscriptions_service_controller_1.SubscriptionsServiceController],
        providers: [subscriptions_service_service_1.SubscriptionsServiceService, subscriptions_prisma_service_1.SubscriptionsPrismaService],
        exports: [subscriptions_service_service_1.SubscriptionsServiceService, subscriptions_prisma_service_1.SubscriptionsPrismaService],
    })
], SubscriptionsServiceModule);
//# sourceMappingURL=subscriptions-service.module.js.map