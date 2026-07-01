import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../src/generated/users';
export declare class UsersPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
