import type { NextFunction, Request, Response } from 'express';

import debug from 'debug';

const logger = debug('backend:express-error');

import { CustomError } from '../errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    logger(`error handled with status code ${err.statusCode} `);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  logger('an express error occured... sending status 500');
  console.error(err);

  return res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
}

export default errorHandler;
