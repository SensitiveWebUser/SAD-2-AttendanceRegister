import { Request, Response } from 'express';

import debug from 'debug';
import {
  AdvisorStudentLink as AdvisorStudentLinkSchema,
  Course as CourseSchema,
  Module as ModuleSchema,
  User as UserSchema,
  UserType as UserTypeSchema,
} from '../database';
import { BadRequestError, NotFoundError } from '../errors';
import {
  AcademicAdvisor,
  Admin,
  CourseLeader,
  ModuleLeader,
  Student,
  Tutor,
  User,
} from '../models';
import { userTypeEnum } from '../utils/userTypeEnum';

const logger = debug('backend:get.user.controller');

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Get the user from the database
  const user = await UserSchema.findByPk(id);

  // If the user is not found, throw a 404 error
  if (!user) {
    logger('user not found');
    throw new BadRequestError('User doesn\'t exist');
  }

  const userType = await UserTypeSchema.findByPk(user.dataValues.user_type_id);

  // Create user object
  const userObject = new User({
    id: user.dataValues.user_id,
    type: user.dataValues.user_type_id,
    firstName: user.dataValues.first_name,
    middleName: user.dataValues.middle_name,
    lastName: user.dataValues.last_name,
    email: user.dataValues.email,
  });

  let userChildObject = null;

  // Create a new object of the user type and choose the user child class
  switch (userType?.dataValues.user_type_name) {
  case userTypeEnum.TUTOR:
    userChildObject = new Tutor({
      userObject,
    });
    break;
  case userTypeEnum.STUDENT:
    // eslint-disable-next-line no-case-declarations
    const advisorStudentLink = await AdvisorStudentLinkSchema.findOne({
      where: {
        student_id: userObject.getId,
      },
    });

    userChildObject = new Student({
      userObject,
      academicAdvisorId: advisorStudentLink?.dataValues.academic_advisor_id,
    });
    break;
  case userTypeEnum.MODULE_LEADER:
    // eslint-disable-next-line no-case-declarations
    const moduleRecord = await ModuleSchema.findOne({
      where: {
        module_leader_id: userObject.getId,
      },
    });

    userChildObject = new ModuleLeader({
      userObject,
      moduleId: moduleRecord?.dataValues.module_id,
    });
    break;
  case userTypeEnum.COURSE_LEADER:
    // eslint-disable-next-line no-case-declarations
    const courseRecord = await CourseSchema.findOne({
      where: {
        course_leader_id: userObject.getId,
      },
    });

    userChildObject = new CourseLeader({
      userObject,
      courseId: courseRecord?.dataValues.course_id,
    });
    break;
  case userTypeEnum.ACADEMIC_ADVISOR:
    userChildObject = new AcademicAdvisor({
      userObject,
    });
    break;
  case userTypeEnum.ADMIN:
    userChildObject = new Admin({
      userObject,
    });
    break;
  default:
    logger(`user type ${userType?.dataValues.user_type_name} not found`);
    throw new NotFoundError('User type not found');
  }

  // Return json data of the user
  res.status(200).json(await userChildObject.toJsonAsync());
};
