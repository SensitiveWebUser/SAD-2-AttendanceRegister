import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors';

export const requireRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['Authorization'] as string;

    if (!authorization) return next(new ForbiddenError());

    //TODO: Check if the user has the required role

    return next();
  };
