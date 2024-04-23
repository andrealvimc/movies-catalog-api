import { UserModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './movies/movies.controller';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [UserModule, MoviesModule, AuthModule, PrismaModule],
  controllers: [MoviesController, AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
