import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteException extends HttpException {
  constructor() {
    super('Error delete Film data', HttpStatus.BAD_REQUEST);
  }
}
