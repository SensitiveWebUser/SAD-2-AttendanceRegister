import debug from 'debug';
import type { Request, Response } from 'express';
import { Course } from '../../database';
import { NotFoundError } from '../../errors';

const logger = debug('backend:courses-controller-update');

export default async function updateCourseAsync(req: Request, res: Response) {
  const { id } = req.params;
  const { name, courseLeader } = req.query;

  const course = await Course.findByPk(id);

  if (!course) {
    logger('course does not exist.');
    throw new NotFoundError();
  }

  if (typeof name === 'string') course.course_name = name;
  if (typeof courseLeader === 'string') course.course_leader_id = courseLeader;

  try {
    await course.save();
    logger(`course with id ${id} updated successfully.`);
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
    logger(`an error occured whilst updating id ${id}`);
    console.log(err);
  }
}
