import { Request, Response, NextFunction } from 'express';

import { CustomError } from '@Errors/customError';

import { UnauthorizedError } from './../errors/unauthorizedError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err);

    err = new UnauthorizedError();
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export default errorHandler;
