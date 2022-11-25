import { Request, Response } from 'express';

import { NotFoundError } from '@Errors';

import { User as UserSchema } from '@Database';

export const createUserController = async (req: Request, res: Response) => {
  // Create a new user
  const user = await UserSchema.create(req.body);

  // Return a 201 status code
  res.status(201).send();
};
