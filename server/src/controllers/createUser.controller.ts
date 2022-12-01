import { Request, Response } from 'express';

import { debug } from 'debug';
import {
  User as UserSchema,
  UserType as UserTypeSchema,
  Attendance as AttendanceSchema,
  Session as SessionSchema,
} from '../database';
import { BadRequestError } from '../errors';
import { Student, User } from '../models';
import { userTypeEnum } from 'src/utils/userTypeEnum';
import managementClient from '../utils/managementClient';

const logger = debug('backend:create.user.controller');

const connectionId = process.env.AUTH0_DATABASE_IDENTIFIER_NAME || '';

export const createUserController = async (req: Request, res: Response) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    sessionIds,
    academicAdvisorId,
  } = req.body;

  const userRecord = await UserSchema.findOne({
    where: {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
    },
  });

  if (userRecord) {
    logger('user already exists');
    throw new BadRequestError('user already exists');
  }

  const StudentTypeRecord = await UserTypeSchema.findOne({
    where: {
      user_type_name: userTypeEnum.STUDENT,
    },
  });

  const Auth0Result = await managementClient.createUser({
    connection: connectionId,
    email,
    password: 'Apassword123',
    app_metadata: {
      role: userTypeEnum.STUDENT,
    },
    user_metadata: {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    },
    email_verified: true,
  });

  logger('Auth0Result', Auth0Result);

  const student = new Student({
    userObject: new User({
      id: Auth0Result.user_id as string,
      type: StudentTypeRecord?.dataValues.user_type_id,
      firstName,
      middleName,
      lastName,
      email,
    }),
    academicAdvisorId: academicAdvisorId,
  });

  sessionIds.forEach(async (sessionId: string) => {
    const SessionRecord = SessionSchema.findByPk(sessionId);

    if (!SessionRecord) {
      logger('session does not exist');
    }

    const attendance = AttendanceSchema.build({
      session_id: sessionId,
      user_id: student.getId,
      attended: null,
    });
    await attendance.save().catch(() => {
      logger('Error creating attendance record');
      throw new Error('Error creating attendance record');
    });
  });

  res.status(200).json(await student.toJsonAsync());
};
