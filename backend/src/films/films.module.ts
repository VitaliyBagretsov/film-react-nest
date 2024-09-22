import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { filmsProviders } from './films.providers';
import { DatabaseModule } from 'src/database/database.module';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [DatabaseModule, SchedulesModule],
  providers: [FilmsService, ...filmsProviders],
  controllers: [FilmsController],
})
export class FilmsModule {}
