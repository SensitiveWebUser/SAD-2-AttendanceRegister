import { Request, Response } from 'express';

import debug from 'debug';
import { User as UserSchema } from '../database';
import { NotFoundError } from '../errors';
import { User } from '../models';

const logger = debug('backend:get.all.users.controller');

export const getAllUsersController = async (req: Request, res: Response) => {
  const userRecords = await UserSchema.findAll();

  if (!userRecords) {
    logger('users not found');
    throw new NotFoundError('No users found');
  }

  const users = userRecords.map(async (userRecord) => {
    return await new User({
      id: userRecord.dataValues.user_id,
      type: userRecord.dataValues.user_type_id,
      firstName: userRecord.dataValues.first_name,
      middleName: userRecord.dataValues.middle_name,
      lastName: userRecord.dataValues.last_name,
      email: userRecord.dataValues.email,
    }).toJsonAsync();
  });

  res.status(200).json(await Promise.all(users));
};
