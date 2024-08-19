import { HttpException, HttpStatus } from '@nestjs/common';

export class FilmAlreadyExistsException extends HttpException {
  constructor() {
    super('Film already exists', HttpStatus.BAD_REQUEST);
  }
}