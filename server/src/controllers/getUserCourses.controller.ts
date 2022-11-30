import debug from 'debug';
import { Request, Response } from 'express';

import { Module, ModuleCourseLink, UserCourseLink } from '../database';
import { NotFoundError } from '../errors';

const logger = debug('backend:get-users-courses-controller');

export const getUserCoursesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const courses = await UserCourseLink.findAll({ where: { user_id: id } });
  if (courses.length === 0) {
    logger('no courses found for student');
    throw new NotFoundError('user is in 0 courses.');
  }

  const finalFormat = await Promise.all(
    courses.map(async (course) => {
      const modules = await ModuleCourseLink.findAll({
        where: { course_id: course.course_id },
      });

      const moduleData = await Promise.all(
        modules.map(async (module) => {
          const moduleDb = await Module.findByPk(module.module_id);

          if (moduleDb === null) {
            throw new Error('module does not exist.');
          }

          return {
            module_name: moduleDb.module_name,
            module_leader_id: moduleDb.module_leader_id,
          };
        })
      );

      return { course_id: course.course_id, modules: moduleData };
    })
  );

  res.status(200).send(finalFormat);
};
