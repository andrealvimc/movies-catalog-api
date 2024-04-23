/*
https://docs.nestjs.com/providers#services
*/

import { PrismaService } from 'src/prisma.service';
import { MovieDTO, createMovieDto } from './movie.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}


  async create(data: createMovieDto) {
    const { title, year, description, imageURL } = data;

    const movie = await this.prisma.movie.create({
      data: {
        title,
        year: Number(year),
        description,
        imageURL
      }
    })

    return movie;
  }


  async delete(id: string) {
    const hasMovie = await this.prisma.movie.findUnique({
      where: {
        id: id
      }
    })

    if(!hasMovie) throw new Error('Movie not found');

    return await this.prisma.movie.delete({
      where: {
        id: id
      }
    })
  }

  async getAllMovies() {
    const movies = await this.prisma.movie.findMany();

    return movies;
  }

  async getMovieById(id: string): Promise<MovieDTO> {
    const cachedMovie = await this.cacheService.get<MovieDTO>(`movie-${id}`);

    if(cachedMovie) return cachedMovie;

    const movie = await this.prisma.movie.findUnique({
      where: {
        id: id
      }
    });

    await this.cacheService.set(`movie-${id}`, movie);

    return movie;
  }

  async updateMovie(id: string, data: createMovieDto) {
    const { title, year, description, imageURL } = data;

    const movie = await this.prisma.movie.update({
      where: {
        id: id
      },
      data: {
        title,
        year: Number(year),
        description,
        imageURL
      }
    })

    return movie;
  }
  

}
