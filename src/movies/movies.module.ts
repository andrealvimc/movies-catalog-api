import { MoviesService } from './movies.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';

@Module({
    imports: [],
    controllers: [MoviesController],
    providers: [
        MoviesService, ],
})
export class MoviesModule {}
