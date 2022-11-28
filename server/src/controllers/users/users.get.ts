import debug from 'debug';
import type { Request, Response } from 'express';
import { User as UserSchema } from '../../database';
import { User as UserModel } from '../../models';
import { NotFoundError } from 'src/errors';

const logger = debug('backend:users-controller');

export default async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  const user = await UserSchema.findByPk(id);

  if (!user) {
    logger('user does not exist.');
    throw new NotFoundError();
  }

  logger(`user id ${id} exists and was returned.`);
  res
    .status(200)
    .json(
      new UserModel(
        user.user_id as string,
        user.user_type_id,
        user.first_name,
        user.middle_name as string,
        user.last_name,
        user.email
      ).toJson()
    );
}
