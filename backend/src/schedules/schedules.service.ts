import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeleteResult, EntityManager } from 'typeorm';

import { ScheduleMissingException } from '../exceptions/schedule-missing.exception ';

import { CreateScheduleDto } from './dto/schedules.dto';
import { CreateScheduleTakenDto } from './dto/schedule-taken.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleTaken } from './entities/schedule-taken.entity';
import { convertSchedule } from './helper/schedules.helper';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  create(data: CreateScheduleDto[]) {
    return this.entityManager.save(Schedule, data);
  }

  getFilmSchedule(filmId: number) {
    return this.entityManager
      .find(Schedule, {
        where: { filmId },
        order: { daytime: 'ASC' },
        relations: {
          taken: true,
        },
      })
      .then((schedule) => {
        if (!schedule || !schedule.length) throw new ScheduleMissingException();
        return {
          items: convertSchedule(schedule),
          total: schedule.length,
        };
      });
  }

  updateSeat(data: CreateScheduleTakenDto) {
    return this.entityManager.save(ScheduleTaken, data);
  }

  removeFilmSchedule(filmId: number): Promise<DeleteResult> {
    return this.entityManager.delete(Schedule, { filmId });
  }
}
