import debug from 'debug';
import type { Request, Response } from 'express';
import { Course } from '../../database';
import { NotFoundError } from '../../errors';

const logger = debug('backend:courses-controller-get');

export default async function getCourse(req: Request, res: Response) {
  const { id } = req.params;

  const course = await Course.findByPk(id);

  if (!course) {
    logger('course does not exist.');
    throw new NotFoundError();
  }

  logger(`course id ${id} exists and was returned.`);
  res.status(200).json(course);
}
