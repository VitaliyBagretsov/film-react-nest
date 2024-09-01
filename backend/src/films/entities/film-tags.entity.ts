import { Entity, PrimaryColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity({ schema: 'afisha' })
export class FilmTags {
  @PrimaryColumn()
  @IsNumber()
  filmId: number;

  @PrimaryColumn()
  @IsString()
  tag: string;
}
