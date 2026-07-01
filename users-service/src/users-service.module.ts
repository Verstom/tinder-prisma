import { Module } from '@nestjs/common';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { UsersPrismaService } from './prisma/users-prisma.service';

@Module({
  imports: [],
  controllers: [UsersServiceController],
  providers: [UsersServiceService, UsersPrismaService],
  exports: [UsersServiceService, UsersPrismaService],
})
export class UsersServiceModule {}
