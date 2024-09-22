import {
  IsNumber,
  IsFQDN,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { ISchedule } from 'src/types';

export class CreateFilmDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsFQDN()
  image: string;

  @IsFQDN()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  schedule: ISchedule[];
}
