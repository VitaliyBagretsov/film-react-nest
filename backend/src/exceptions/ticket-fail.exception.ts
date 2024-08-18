import { HttpException, HttpStatus } from '@nestjs/common';

export class TicketFailException extends HttpException {
  constructor() {
    super('Seat of ticket is not free', HttpStatus.BAD_REQUEST);
  }
}