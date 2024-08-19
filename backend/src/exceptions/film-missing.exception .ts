import { HttpException, HttpStatus } from '@nestjs/common';

export class FilmMissingException extends HttpException {
  constructor() {
    super('Film is missing', HttpStatus.BAD_REQUEST);
  }
}