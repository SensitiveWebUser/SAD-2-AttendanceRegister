import { Request, Response } from 'express';

import { User } from '../models';
import { User as UserSchema } from '../database';
import { NotFoundError } from '../errors';

export const createUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRecord = await UserSchema.findByPk(id);

  if (!userRecord) throw new NotFoundError('User not found');

  const user = new User({
    id: userRecord.dataValues.user_id,
    type: userRecord.dataValues.user_type_id,
    firstName: userRecord.dataValues.first_name,
    middleName: userRecord.dataValues.middle_name,
    lastName: userRecord.dataValues.last_name,
    email: userRecord.dataValues.email,
  });

  res.status(200).json(await user.toJsonAsync());
};
