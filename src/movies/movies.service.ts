/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createMovieDto } from './movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}


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


}
