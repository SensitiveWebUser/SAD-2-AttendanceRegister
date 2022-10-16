import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public messsage: string) {
    super(messsage);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.messsage }];
  }
}
