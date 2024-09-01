import { HttpException, HttpStatus } from '@nestjs/common';

export class ScheduleMissingException extends HttpException {
  constructor() {
    super('Schedule is missing or empty', HttpStatus.BAD_REQUEST);
  }
}
