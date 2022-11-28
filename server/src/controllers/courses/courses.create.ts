import debug from 'debug';
import type { Request, Response } from 'express';
import { Course } from '../../database';

const logger = debug('backend:courses-controller-create');

export default async function getCourse(req: Request, res: Response) {
  const { name, courseLeader } = req.query;

  const course = Course.build({
    course_name: name,
    course_leader_id: courseLeader,
  });

  try {
    await course.save();
    logger(`course with name ${name} was added successfully.`);
    res.status(200).end();
  } catch (err) {
    logger(`course with name ${name} could not be added.`);
    console.log(err);
    res.status(500).end();
  }
}
