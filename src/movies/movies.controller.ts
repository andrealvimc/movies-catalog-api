/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MovieDTO, createMovieDto } from './movie.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatedOutputDto } from 'src/dto/pagination.dto';
import { ApiPaginatedResponse } from 'src/pagination.decorator';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly prisma: PrismaService
  ) {}


  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() data: createMovieDto) {
    return this.moviesService.create(data);
  }


  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiPaginatedResponse(MovieDTO)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<PaginatedOutputDto<MovieDTO>> {
    const paginate = await createPaginator({ perPage });


    const result = await paginate<MovieDTO, Prisma.MovieFindManyArgs>(
      this.prisma.movie,
      {
       where: {},
        orderBy: {
          id: 'desc',
        },
      },
      {
        page,
      },
    );

    return result
  }
}
