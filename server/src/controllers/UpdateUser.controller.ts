import { Request, Response } from 'express';

import { NotFoundError } from '@Errors';

import { User as UserSchema } from '@Database';

import { getUser } from '@Utils/getUser';

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, middlename, lastname, email, password } = req?.body;

  // Get the user from the database
  //const user = await getUser(id);

  //const user.update();

  // Return a 204 status code
  res.status(204).send();
};
