import { IsNumber, IsString } from 'class-validator';

export class CreateScheduleTakenDto {
  @IsNumber()
  scheduleId: number;

  @IsString()
  seat: string;
}
