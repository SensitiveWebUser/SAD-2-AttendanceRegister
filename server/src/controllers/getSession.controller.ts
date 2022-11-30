import { Request, Response } from 'express';

import debug from 'debug';
import { Session as SessionSchema } from '../database';
import { BadRequestError } from '../errors';
import { Session } from '../models';

const logger = debug('backend:get.Session.controller');

export const getSessionController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sessionRecord = await SessionSchema.findByPk(id);

  if (!sessionRecord) {
    logger('session not found');
    throw new BadRequestError('Session not found');
  }
  const session = new Session({
    id: sessionRecord.dataValues.session_id,
    type: sessionRecord.dataValues.session_type_id,
    moduleId: sessionRecord.dataValues.module_id,
    startTimestamp: sessionRecord.dataValues.start_timestamp,
    endTimestamp: sessionRecord.dataValues.end_timestamp,
    code: sessionRecord.dataValues.code,
  });

  res.status(200).json(await session.toJsonAsync());
};
