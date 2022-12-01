import debug from 'debug';
import type { Request, Response } from 'express';
import { Course, User as UserSchema } from '../../database';
import { NotFoundError } from '../../errors';
import { Course as CourseModel, CourseLeader, User } from '../../models';

const logger = debug('backend:courses-controller-get');

export default async function getCourseAsync(req: Request, res: Response) {
  const { id } = req.params;

  const course = await Course.findByPk(id);

  if (!course) {
    logger('course does not exist.');
    throw new NotFoundError();
  }

  const courseLeaderRecord = await UserSchema.findByPk(
    course.dataValues.course_leader_id
  );

  const courseLeader = new CourseLeader({
    userObject: new User({
      id: courseLeaderRecord?.dataValues.user_id,
      type: courseLeaderRecord?.dataValues.user_type_id,
      firstName: courseLeaderRecord?.dataValues.first_name,
      middleName: courseLeaderRecord?.dataValues.middle_name,
      lastName: courseLeaderRecord?.dataValues.last_name,
      email: courseLeaderRecord?.dataValues.email,
    }),
    courseId: course?.dataValues.course_id,
  });

  const courseData = new CourseModel({
    id: course.dataValues.course_id,
    name: course.dataValues.course_name,
    courseLeader,
  });

  logger(`course id ${id} exists and was returned.`);
  res.status(200).json(await courseData.toJsonAsync());
}
