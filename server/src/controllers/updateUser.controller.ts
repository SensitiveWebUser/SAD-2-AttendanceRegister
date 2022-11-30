import { Request, Response } from 'express';

import debug from 'debug';
import { User as UserSchema, UserType as UserTypeSchema } from '../database';
import { NotFoundError } from '../errors';
import { User } from '../models';

const logger = debug('backend:update.user.controller');

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, email, type } = req.body;

  const userRecord = await UserSchema.findByPk(id);
  const userTypeRecord = await UserTypeSchema.findOne({
    where: { user_type_name: type },
  });

  if (!userRecord) {
    logger('user not found');
    throw new NotFoundError('User not found');
  }
  if (!userTypeRecord) {
    logger('user type not found');
    throw new Error('User type not found');
  }

  const user = new User({
    id: userRecord?.dataValues.user_id,
    type: userTypeRecord.dataValues.user_type_id,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
  });

  await user.updateDatabaseAsync();

  res.status(200).json(user.toJsonAsync());
};
