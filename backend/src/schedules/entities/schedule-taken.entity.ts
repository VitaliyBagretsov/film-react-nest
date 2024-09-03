import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity({ schema: 'afisha' })
export class ScheduleTaken {
  @PrimaryColumn()
  scheduleId: number;

  @PrimaryColumn()
  @IsString()
  seat: string;

  @ManyToOne(() => Schedule, (film) => film.taken)
  schedule: Schedule;
}
