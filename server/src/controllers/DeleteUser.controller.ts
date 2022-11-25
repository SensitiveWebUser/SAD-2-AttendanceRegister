import { Request, Response } from 'express';

import { NotFoundError } from '@Errors';

import { User as UserSchema } from '@Database';

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Get the user from the database
  const user = await UserSchema.findByPk(id);

  // If the user is not found, throw a 404 error
  if (!user) {
    throw new NotFoundError();
  }

  // Delete the user
  await user.destroy();

  // Return a 204 status code
  res.status(204).send();
};
