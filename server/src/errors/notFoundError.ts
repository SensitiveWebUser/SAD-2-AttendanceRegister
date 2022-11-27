import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  constructor(message: string = 'Route Not Found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
