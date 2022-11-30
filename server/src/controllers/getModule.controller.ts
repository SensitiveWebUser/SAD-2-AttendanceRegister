import { Request, Response } from 'express';

import debug from 'debug';
import { Module as ModuleSchema, User as UserSchema } from '../database';
import { BadRequestError } from '../errors';
import { Module, ModuleLeader, User } from '../models';

const logger = debug('backend:get.module.controller');

export const getModuleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const moduleRecord = await ModuleSchema.findByPk(id);

  if (!moduleRecord) {
    logger('module not found');
    throw new BadRequestError('Module not found');
  }

  const moduleLeaderRecord = await UserSchema.findByPk(
    moduleRecord.dataValues.module_leader_id
  );

  const moduleLeader = new ModuleLeader({
    userObject: new User({
      id: moduleLeaderRecord!.dataValues.user_id,
      type: moduleLeaderRecord!.dataValues.user_type_id,
      firstName: moduleLeaderRecord!.dataValues.first_name,
      middleName: moduleLeaderRecord!.dataValues.middle_name,
      lastName: moduleLeaderRecord!.dataValues.last_name,
      email: moduleLeaderRecord!.dataValues.email,
    }),
    moduleId: moduleRecord!.dataValues.module_id,
  });

  const module = new Module({
    id: moduleRecord.dataValues.module_id,
    name: moduleRecord.dataValues.module_name,
    moduleLeader,
  });

  res.status(200).json(await module.toJsonAsync());
};
