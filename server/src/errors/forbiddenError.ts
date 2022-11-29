import { CustomError } from './customError';

export class ForbiddenError extends CustomError {
  statusCode = 403;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  constructor(message: string = 'Forbidden access') {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
