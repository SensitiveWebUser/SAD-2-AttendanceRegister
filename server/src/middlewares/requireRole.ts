import { debug } from 'debug';
import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { ForbiddenError } from '../errors';

const logger = debug('backend:authorization.roles.middleware');

type jwt = {
  'http://sad.assignment.com/userData': {
    user: object;
    app: {
      role: string;
    };
  };
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // bypassing authentication for testing purposes
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const authorization = req.headers.authorization?.split(' ')[1];

    if (!authorization) {
      logger('request was not authorised.');
      return next(new ForbiddenError());
    }

    const decoded: jwt = jwt_decode(authorization);

    logger('decoded token: ', decoded);

    if (
      !roles.includes(decoded['http://sad.assignment.com/userData'].app.role)
    ) {
      logger('request was not authorised.');
      return next(new ForbiddenError());
    }

    next();
  };
};
