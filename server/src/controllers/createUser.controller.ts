import { Request, Response } from 'express';

import { debug } from 'debug';
import { User as UserSchema } from '../database';
import { BadRequestError } from '../errors';
import { User } from '../models';

const logger = debug('backend:create.user.controller');

export const createUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRecord = await UserSchema.findByPk(id);

  if (!userRecord) {
    logger('user not found');
    throw new BadRequestError('User not found');
  }

  //TODO: Add user to auth0

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
