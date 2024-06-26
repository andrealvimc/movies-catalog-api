import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UserModule {}
