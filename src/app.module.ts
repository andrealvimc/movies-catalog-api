import { UserModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './movies/movies.controller';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
        UserModule, 
        MoviesModule, AuthModule,  ],
  controllers: [
        MoviesController, AppController],
  providers: [AppService],
})
export class AppModule {}
