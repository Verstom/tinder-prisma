"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServiceModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_controller_1 = require("./users-service.controller");
const users_service_service_1 = require("./users-service.service");
const users_prisma_service_1 = require("./prisma/users-prisma.service");
let UsersServiceModule = class UsersServiceModule {
};
exports.UsersServiceModule = UsersServiceModule;
exports.UsersServiceModule = UsersServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [users_service_controller_1.UsersServiceController],
        providers: [users_service_service_1.UsersServiceService, users_prisma_service_1.UsersPrismaService],
        exports: [users_service_service_1.UsersServiceService, users_prisma_service_1.UsersPrismaService],
    })
], UsersServiceModule);
//# sourceMappingURL=users-service.module.js.map