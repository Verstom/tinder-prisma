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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsServiceController = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_service_1 = require("./subscriptions-service.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const update_subscription_plan_dto_1 = require("./dto/update-subscription-plan.dto");
let SubscriptionsServiceController = class SubscriptionsServiceController {
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    /** Devuelve los planes disponibles (FREE, GOLD, PREMIUM) */
    getPlans() {
        return this.subscriptionsService.getPlans();
    }
    create(dto) {
        return this.subscriptionsService.create(dto);
    }
    findAll() {
        return this.subscriptionsService.findAll();
    }
    findByUser(userId) {
        return this.subscriptionsService.findByUser(userId);
    }
    findOne(id) {
        return this.subscriptionsService.findOne(id);
    }
    update(id, dto) {
        return this.subscriptionsService.update(id, dto);
    }
    remove(id) {
        return this.subscriptionsService.remove(id);
    }
};
exports.SubscriptionsServiceController = SubscriptionsServiceController;
__decorate([
    (0, common_1.Get)('plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_subscription_plan_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionsServiceController.prototype, "remove", null);
exports.SubscriptionsServiceController = SubscriptionsServiceController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_service_1.SubscriptionsServiceService])
], SubscriptionsServiceController);
//# sourceMappingURL=subscriptions-service.controller.js.map