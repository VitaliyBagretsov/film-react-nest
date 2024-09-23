import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity({ schema: 'afisha' })
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column({ unique: true })
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
