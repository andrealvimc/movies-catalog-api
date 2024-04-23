import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { version } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Get()
  getHello() {
    return {
      message: 'Welcome to the Movies API catalog',
      documentation: 'https://api-movies.alvimdev.tech/docs',
      github: 'https://github.com/andrealvimc/movies-catalog-api',
      version: '1.0.0',
    }
  }
}
