import debug from 'debug';
import type { Request, Response, NextFunction } from 'express';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import * as jwks from 'jwks-rsa';
import { UnauthorisedError } from '../errors';

const logger = debug('backend:authentication');

// This is the middleware that will be used to verify the JWT token
// It will be used in the routes that require authentication
// It checks the JWT token in the Authorization header of the request
// and verifies it against the public key of the Auth0 tenant

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const issuerUrl = process.env.AUTH0_ISSUER;

  // bypassing authentication for testing purposes
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  // validate JWT
  expressjwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${issuerUrl}.well-known/jwks.json`,
    }) as GetVerificationKey,
    issuer: issuerUrl,
    algorithms: ['RS256'],
  })(req, res, (err) => {
    if (err) {
      logger('request was not authorised.');
      return next(new UnauthorisedError());
    }

    next();
  });
};
