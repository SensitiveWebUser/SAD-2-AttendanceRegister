import { Request, Response } from 'express';

import { NotFoundError } from '@Errors';

import { User as UserSchema } from '@Database';
import { User } from '@Models';

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Get the user from the database
  const user = await UserSchema.findByPk(id);

  // If the user is not found, throw a 404 error
  if (!user) {
    throw new NotFoundError();
  }

  const userObj = new User({
    userId: user.dataValues.user_id,
    firstName: user.dataValues.first_name,
    middleName: user.dataValues.middle_name,
    lastName: user.dataValues.last_name,
    email: user.dataValues.email,
    userTypeId: user.dataValues.user_type_id,
  });

  // Return json data of the user
  res.status(200).json(await userObj.toJson());
};
