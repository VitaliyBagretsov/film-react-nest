import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Film } from './entities/film.entity';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { filmsProviders } from './films.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Film])],
  providers: [FilmsService, ...filmsProviders],
  controllers: [FilmsController],
})
export class FilmsModule {}
