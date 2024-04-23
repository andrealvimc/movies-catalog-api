import { MoviesService } from './movies.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
