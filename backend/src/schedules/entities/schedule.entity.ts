import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ScheduleTaken } from './schedule-taken.entity';
import { Film } from '../../films/entities/film.entity';

@Entity({ schema: 'afisha' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  filmId: number;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;

  @OneToMany(() => ScheduleTaken, (scheduleTaken) => scheduleTaken.schedule)
  taken: ScheduleTaken[];
}
