import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { FilmsService } from '../films/films.service';
import { filmsProviders } from '../films/films.providers';
import { SchedulesService } from '../schedules/schedules.service';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, FilmsService, ...filmsProviders, SchedulesService],
  controllers: [OrderController],
})
export class OrderModule {}
