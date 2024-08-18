import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string) {
    return this.filmsService.findById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }
}