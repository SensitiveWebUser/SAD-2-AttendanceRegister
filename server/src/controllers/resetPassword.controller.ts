import { Request, Response } from 'express';

import debug from 'debug';
import { User as UserSchema } from '../database';
import { BadRequestError } from '../errors';
import managementClient from '../utils/managementClient';

const logger = debug('backend:reset.user..password.controller');

export const resetPasswordController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  const userRecord = await UserSchema.findByPk(id);

  if (!userRecord) {
    logger('user not found');
    throw new BadRequestError('User not found');
  }

  await managementClient.updateUser({ id: id }, { password }).catch(() => {
    logger(`failed to update Id: ${id} user password`);
    throw new BadRequestError('Couldn\'t reset password');
  });

  res.status(200).json();
};
