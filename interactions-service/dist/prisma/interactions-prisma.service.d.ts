import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../src/generated/interactions';
export declare class InteractionsPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
