import { Request, Response, NextFunction } from 'express';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import * as jwks from 'jwks-rsa';

import { UnauthorizedError } from '@Errors/unauthorizedError';

// This is the middleware that will be used to verify the JWT token
// It will be used in the routes that require authentication
// It checks the JWT token in the Authorization header of the request
// and verifies it against the public key of the Auth0 tenant

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ISSUER = process.env.AUTH0_ISSUER;

  expressjwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${ISSUER}.well-known/jwks.json`,
    }) as GetVerificationKey,
    issuer: ISSUER,
    algorithms: ['RS256'],
  })(req, res, (err) => {
    if (err) {
      next(new UnauthorizedError());
    }

    next();
  });
};
