import { Request, Response } from 'express';

import { Tutor, User } from '../models';
import { User as UserSchema, UserType as UserTypeSchema } from '../database';
import { BadRequestError } from '../errors';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import debug from 'debug';

const logger = debug('backend:get.tutor.sessions.controller');

export const getTutorSessionsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const userRecord = await UserSchema.findByPk(id);

  if (!userRecord) {
    logger('user not found');
    throw new BadRequestError('User not found');
  }

  const userTypeRecord = await UserTypeSchema.findByPk(
    userRecord.dataValues.user_type_id
  );

  if (!userTypeRecord) {
    logger('user type not found');
    throw new Error('User type not found');
  }

  if (userTypeRecord.dataValues.user_type_name !== userTypeEnum.TUTOR)
    throw new BadRequestError('User is not a tutor');

  const tutor = new Tutor({
    userObject: new User({
      id: userRecord.dataValues.user_id,
      type: userRecord.dataValues.user_type_id,
      firstName: userRecord.dataValues.first_name,
      middleName: userRecord.dataValues.middle_name,
      lastName: userRecord.dataValues.last_name,
      email: userRecord.dataValues.email,
    }),
  });

  res.status(200).json(await tutor.tutorSessionsToJsonAsync());
};
