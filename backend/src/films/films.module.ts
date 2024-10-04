import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { SchedulesModule } from '../schedules/schedules.module';

import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [DatabaseModule, SchedulesModule],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
