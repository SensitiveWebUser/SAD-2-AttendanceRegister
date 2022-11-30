import { Request, Response } from 'express';

import debug from 'debug';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import {
  AdvisorStudentLink as AdvisorStudentLinkSchema,
  Session as SessionSchema,
  User as UserSchema,
  UserType as UserTypeSchema,
} from '../database';
import { BadRequestError } from '../errors';
import { Session, Student, User } from '../models';

const logger = debug('backend:register.student.attendance.controller');

export const registerAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { code } = req.body;

  const userRecord = await UserSchema.findByPk(id);
  const sessionRecord = await SessionSchema.findOne({
    where: { code: code },
  });

  if (!userRecord) {
    logger('user not found');
    throw new BadRequestError('User not found');
  }
  if (!sessionRecord) {
    logger('session not found');
    throw new BadRequestError('Session not found');
  }

  const UserTypeRecord = await UserTypeSchema.findByPk(
    userRecord.dataValues.user_type_id
  );

  const AdvisorStudentLinkRecord = await AdvisorStudentLinkSchema.findOne({
    where: {
      student_id: userRecord.dataValues.user_id,
    },
  });

  if (!UserTypeRecord) {
    logger('user type not found');
    throw new Error('User type not found');
  }
  if (!AdvisorStudentLinkRecord) {
    logger('advisor student link not found');
    throw new Error('Advisor student link not found');
  }

  if (UserTypeRecord.dataValues.user_type_name !== userTypeEnum.STUDENT) {
    logger('user is not a student');
    throw new BadRequestError('User is not a student');
  }

  const session = new Session({
    id: sessionRecord.dataValues.session_id,
    type: sessionRecord.dataValues.session_type_id,
    moduleId: sessionRecord.dataValues.module_id,
    startTimestamp: sessionRecord.dataValues.start_timestamp,
    endTimestamp: sessionRecord.dataValues.end_timestamp,
    code: sessionRecord.dataValues.code,
  });

  const student = new Student({
    userObject: new User({
      id: userRecord.dataValues.user_id,
      type: UserTypeRecord!.dataValues.user_type_id,
      firstName: userRecord.dataValues.first_name,
      middleName: userRecord.dataValues.middle_name,
      lastName: userRecord.dataValues.last_name,
      email: userRecord.dataValues.email,
    }),
    academicAdvisorId: userRecord.dataValues.academic_advisor_id,
  });

  if (await student.registerAttendanceAsync(session, code)) {
    res.status(200).send();
  }

  logger('failed to register attendance');
  throw new BadRequestError('Failed to register attendance');
};
