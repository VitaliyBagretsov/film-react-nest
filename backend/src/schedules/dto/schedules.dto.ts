import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  filmId: number;

  @IsString()
  daytime: string;

  @IsNumber()
  hall: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rows: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  seats: number;

  @IsNumber()
  @Min(1)
  price: number;
}
