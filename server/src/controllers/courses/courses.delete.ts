import debug from 'debug';
import type { Request, Response } from 'express';
import { Course } from '../../database';
import { NotFoundError } from '../../errors';

const logger = debug('backend:courses-controller-delete');

export default async function getCourse(req: Request, res: Response) {
  const { id } = req.params;

  const course = await Course.findByPk(id);

  if (!course) {
    logger(`course ${id} does not exist.`);
    throw new NotFoundError();
  }

  try {
    await course.destroy();
    logger(`course ${id} was deleted successfully.`);
    res.status(200).end();
  } catch (err) {
    logger(`course ${id} was could not be deleted.`);
    console.log(err);
    res.status(500).end();
  }
}
