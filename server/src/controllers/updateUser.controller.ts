import { Request, Response } from 'express';

import { User } from '../models';
import { User as UserSchema, UserType as UserTypeSchema } from '../database';
import { NotFoundError } from '../errors';

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, typeId } = req.body;

  const userRecord = await UserSchema.findByPk(id);
  const userTypeRecord = await UserTypeSchema.findByPk(typeId);

  if (!userRecord) throw new NotFoundError('User not found');
  if (!userTypeRecord) throw new NotFoundError('User type not found');

  const user = new User({
    id: userRecord!.dataValues.user_id,
    type: userRecord.dataValues.user_type_id,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: userRecord!.dataValues.email,
  });

  await user.updateDatabaseAsync();

  res.status(200).json(user.toJsonAsync());
};
