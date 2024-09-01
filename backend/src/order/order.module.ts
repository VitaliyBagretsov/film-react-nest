import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsService } from 'src/films/films.service';
import { filmsProviders } from 'src/films/films.providers';
import { Film } from 'src/films/entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Film])],
  providers: [OrderService, FilmsService, ...filmsProviders],
  controllers: [OrderController],
})
export class OrderModule {}
