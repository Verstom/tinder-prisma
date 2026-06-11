import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersPrismaService } from '../prisma/users-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersPrismaService],
  exports: [UsersService],
})
export class UsersModule {}