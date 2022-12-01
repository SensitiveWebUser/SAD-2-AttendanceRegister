import debug from 'debug';
import { Request, Response } from 'express';
import { Course, User, CourseLeader } from '../models';
import {
  UserCourseLink as UserCourseLinkSchema,
  Course as CourseSchema,
  User as UserSchema,
} from '../database';
import { NotFoundError } from '../errors';

const logger = debug('backend:get.users.courses.controller');

export const getUserCoursesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const courses = await UserCourseLinkSchema.findOne({
    where: { user_id: id },
  });
  if (!courses) {
    logger('no courses found for student');
    throw new NotFoundError('user is in 0 courses.');
  }

  const courseRecord = await CourseSchema.findByPk(courses.course_id);

  if (!courseRecord) {
    logger('course does not exist');
    throw new NotFoundError('course does not exist');
  }

  const userRecord = await UserSchema.findByPk(courses.user_id);

  if (!userRecord) {
    logger('user does not exist');
    throw new NotFoundError('user does not exist');
  }

  const course = new Course({
    id: courseRecord.course_id as string,
    name: courseRecord.course_name,
    courseLeader: new CourseLeader({
      userObject: new User({
        id: userRecord.user_id,
        type: userRecord.user_type_id,
        firstName: userRecord.first_name,
        middleName: userRecord.middle_name || '',
        lastName: userRecord.last_name,
        email: userRecord.email,
      }),
      courseId: courseRecord.course_id || '',
    }),
  });

  res.status(200).send(await course.toJsonAsync());
};
