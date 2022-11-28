import { Request, Response } from 'express';

import { Course, CourseLeader, User } from '../models';
import { Course as CourseSchema, User as UserSchema } from '../database';
import { BadRequestError } from '../errors';

export const getCourseController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const courseRecord = await CourseSchema.findByPk(id);

  if (!courseRecord) throw new BadRequestError('Course not found');

  const courseLeaderRecord = await UserSchema.findByPk(
    courseRecord.dataValues.course_leader_id
  );

  const courseLeader = new CourseLeader({
    userObject: new User({
      id: courseLeaderRecord!.dataValues.user_id,
      type: courseLeaderRecord!.dataValues.user_type_id,
      firstName: courseLeaderRecord!.dataValues.first_name,
      middleName: courseLeaderRecord!.dataValues.middle_name,
      lastName: courseLeaderRecord!.dataValues.last_name,
      email: courseLeaderRecord!.dataValues.email,
    }),
    courseId: courseRecord!.dataValues.course_id,
  });

  const course = new Course({
    id: courseRecord.dataValues.course_id,
    name: courseRecord.dataValues.course_name,
    courseLeader,
  });

  res.status(200).json(await course.toJsonAsync());
};
