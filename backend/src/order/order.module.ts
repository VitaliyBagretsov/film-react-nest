import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsService } from 'src/films/films.service';
import { filmsProviders } from 'src/films/films.providers';
import { SchedulesService } from 'src/schedules/schedules.service';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, FilmsService, ...filmsProviders, SchedulesService],
  controllers: [OrderController],
})
export class OrderModule {}
