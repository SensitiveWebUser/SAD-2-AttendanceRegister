import { expressjwt, GetVerificationKey } from 'express-jwt';
import * as jwks_rsa from 'jwks-rsa';

// This is the middleware that will be used to verify the JWT token
// It will be used in the routes that require authentication
// It checks the JWT token in the Authorization header of the request
// and verifies it against the public key of the Auth0 tenant
export const requireAuth = expressjwt({
  secret: jwks_rsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN as string}.well-known/jwks.json`,
  }) as GetVerificationKey,

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE as string,
  issuer: process.env.AUTH0_DOMAIN as string,
  algorithms: ['RS256'],
});
